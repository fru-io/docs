const fs = require("fs")
const _ = require("lodash")
const path = require("path")
const showdown = require("showdown")
const fm = require("front-matter")
const YAML = require("yamljs")
const FruFreshdesk = require("./freshdesk")

const converter = new showdown.Converter({
    tables: true,
    strikethrough: true,
    simpleLineBreaks: true,
    simplifiedAutoLink: true,
    omitExtraWLInCodeBlocks: true,
    disableForced4SpacesIndentedSublists: true
})
const freshdesk = new FruFreshdesk("https://drudtech.freshdesk.com", process.env.FRESHDESKAPITOKEN)

const internalDocs = 36000120009

// function to turn a string into a URL friendly file slug
const slugify = (string) => {
    const a = "àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœṕŕßśșțùúüûǘẃẍÿź·/_,:;"
    const b = "aaaaaaaaceeeeghiiiimnnnoooooprssstuuuuuwxyz------"
    const p = new RegExp(a.split("").join("|"), "g")

    return string.toString().toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, "-and-") // Replace & with 'and'
        .replace(/[^\w\-]+/g, "") // Remove all non-word characters
        .replace(/--/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, "") // Trim - from end of text
}

// renders the markdown output
const renderMarkdown = (meta, body) => {
    // remove path from rendered output
    meta = _.omit(meta, ["path"])

    // build MD body content
    const mdMeta = "---\n" + YAML.stringify(meta) + "---\n"
    const mdContent = converter.makeMarkdown(body)
    return mdMeta + "\n" + mdContent
}

// renders the markdown output
const writeMarkdown = (meta, body) => {
    // write to a new file
    fs.writeFile(meta.path, renderMarkdown(meta, body), (err) => {
    // throws an error, you could also catch it here
        if (err) throw err
        // success case, the file was saved
        console.log(`"${meta.path}" updated`)
    })
}

// recursive function to collect all local documents
const findSupportDocs = (dir = "./docs/freshdesk", filelist = []) => {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file)

        if (fs.statSync(filePath).isDirectory()) {
            filelist = findSupportDocs(filePath, filelist)
        } else {
            const markdown = fm( fs.readFileSync(filePath, "utf8") )

            // filter out non freshdesk content
            if (markdown.attributes.freshdesk) {
                filelist = filelist.concat({
                    ...markdown.attributes,
                    path: filePath,
                })
            }

        }
    })

    return filelist
}

const mdSupportDocs = findSupportDocs()
// console.log(mdSupportDocs);

// get and loop through freshdesk categories
freshdesk.getSolutionsCategories({}, function (err, fdCategories) {
    // console.log(err || fdCategories)
    if (err) {
        console.error(err)
        return
    }

    // filter out the internal docs
    fdCategories = _.reject(fdCategories, { "id": internalDocs })

    // loop through the filtered freshdesk Categories
    fdCategories.forEach(cat => {

        // see if we have an existing local category that matches
        let localCategory = _.find(mdSupportDocs, [ "freshdesk.id", cat.id ])
        const htmlBody = cat.description ? cat.description : "<p>...</p>"
        cat = _.omit(cat, ["description", "created_at", "updated_at"])

        // IF cat exist update and write to the path value stored in front-matter if it exists
        if (localCategory) {

            // merge the freshdesk data from FD and local markdown
            localCategory.freshdesk = _(localCategory.freshdesk)
                .merge(localCategory.freshdesk, cat)
                .value()

            // write content to file
            writeMarkdown(localCategory, htmlBody)

            // IF doesn't exist write cat data to "${cat}/_index.md" file
        } else {

            const catMeta = {
                title: cat.name,
                description: cat.name + " description...",
                freshdesk: _.merge({
                    name: "Sample Category Name",
                    id: null,
                    taxonomy: "category"
                }, cat),
                path: `docs/freshdesk/${slugify(cat.name)}/_index.md`
            }

            // write to a new file
            writeMarkdown(catMeta, htmlBody)

        }


        // get folders for each category
        freshdesk.getSolutionFolders(cat.id, function (err, folders) {
        // console.log(err || folders)
            if (err) {
                console.error(err)
                return
            }

            folders.forEach(folder => {

                let localFolder = _.find(mdSupportDocs, [ "freshdesk.id", folder.id ])
                const htmlBody = folder.description ? folder.description : "<p>...</p>"
                folder = _.merge(folder, {category_id: cat.id})
                folder = _.omit(folder, ["description", "created_at", "updated_at"])

                // IF cat exist update and write to the path value stored in front-matter if it exists
                if (localFolder) {

                    // merge the freshdesk data from FD and local markdown
                    localFolder.freshdesk = _(localFolder.freshdesk)
                        .merge(localFolder.freshdesk, folder)
                        .value()

                    // write content to file
                    writeMarkdown(localFolder, htmlBody)

                    // IF doesn't exist write cat data to "${cat}/${folder}/_index.md" file
                } else {

                    const folderMeta = {
                        title: folder.name,
                        description: folder.name + " description...",
                        freshdesk: _.merge({
                            name: folder.name,
                            id: folder.id,
                            category_id: folder.category_id,
                            visibility: folder.visibility,
                            taxonomy: "folder",
                            company_ids: []
                        }, folder),
                        path: `docs/freshdesk/${slugify(cat.name)}/${slugify(folder.name)}/_index.md`
                    }

                    // write to a new file
                    writeMarkdown(folderMeta, htmlBody)

                }


                // get articles for each folder
                freshdesk.getSolutionFolderArticles(folder.id, function (err, articles) {
                    // console.log(err || articles)
                    if (err) {
                        console.error(err)
                        return
                    }

                    articles.forEach(article => {

                        let localArticle = _.find(mdSupportDocs, [ "freshdesk.id", article.id ])
                        const htmlBody = article.description ? article.description : "<p>...</p>"
                        article = _.omit(article, [
                            "description",
                            "description_text",
                            "seo_data",
                            "thumbs_up",
                            "thumbs_down",
                            "created_at",
                            "updated_at",
                            "hits"
                        ])

                        // IF cat exist update and write to the path value stored in front-matter if it exists
                        if (localArticle) {

                            // merge the freshdesk data from FD and local markdown
                            localArticle.freshdesk = _(localArticle.freshdesk)
                                .merge(localArticle.freshdesk, article)
                                .value()

                            // write content to file
                            writeMarkdown(localArticle, htmlBody)

                            // IF doesn't exist write cat data to "${cat}/${folder}/${article}.md" file
                        } else {

                            const articleMeta = {
                                title: article.title,
                                description: article.title + "...",
                                freshdesk: _.merge({
                                    title: article.title || "",
                                    id: article.id || null,
                                    type: article.type || 1,
                                    category_id: article.category_id,
                                    folder_id: article.folder_id,
                                    agent_id: article.agent_id,
                                    status: article.status || 2,
                                    tags: []
                                }, folder),
                                path: `docs/freshdesk/${slugify(cat.name)}/${slugify(folder.name)}/${slugify(article.title)}.md`
                            }

                            // write to a new file
                            writeMarkdown(articleMeta, htmlBody)

                        }

                    })

                })

            })

        })

    })

})