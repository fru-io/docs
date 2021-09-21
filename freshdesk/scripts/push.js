const fs = require("fs")
const _ = require("lodash")
const path = require("path")
const showdown = require("showdown")
const fm = require("front-matter")
const striptags = require("striptags")
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

// validate path to search for support docs
if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + "  ./docs")
    process.exit(-1)
}

// recursive function to collect all document files
const findSupportDocs = (dir, filelist = []) => {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file)

        if (fs.statSync(filePath).isDirectory()) {
            filelist = findSupportDocs(filePath, filelist)
        } else {
            const markdown = fm( fs.readFileSync(filePath, "utf8") )

            // filter out non freshdesk content
            if (markdown.attributes.freshdesk) {
                filelist = filelist.concat({
                    path: filePath,
                    ...markdown.attributes.freshdesk,
                    description: converter.makeHtml(markdown.body),
                    description_text: striptags(converter.makeHtml(markdown.body))
                })
            }

        }
    })

    return filelist
}


// filter all the static content into groups - Categories, Folders, Articles to follow FreshDesk Schema
const [ doc_categories, doc_category_articles ] = _.partition(findSupportDocs(process.argv[2]), [ "taxonomy", "category" ])
const [ doc_folders, filtered_articles ] = _.partition(doc_category_articles, [ "taxonomy", "folder" ])

// Categories
_.forEach(doc_categories, (category) => {
    const {
        name = "",
        id = null,
        description = "",
        // visible_in_portals = []
    } = category

    // if category exists
    if (_.isNumber(id)) {
        // update category
        freshdesk.updateSolutionsCategory(id, {
            name,
            description,
        }, function (err, data) {
            console.log(err || data)
        })
    } else {
        // create category
        freshdesk.createSolutionsCategory({
            name,
            description,
        }, function (err, data) {
            console.log(err || data)
        })
    }

})

// Folders
_.forEach(doc_folders, (folder) => {
    const {
        name = "",
        id = null,
        category_id = null,
        description = "",
        visibility = 3, // agents
        // company_ids = []
    } = folder

    // if folder exists
    if (_.isNumber(id)) {
        // update folder
        freshdesk.updateSolutionsFolder(id, {
            name,
            description,
            visibility,
        }, function (err, data) {
            console.log(err || data)
        })
    } else {
        // create folder
        freshdesk.createSolutionsFolder(category_id, {
            name,
            description,
            visibility,
        }, function (err, data) {
            console.log(err || data)
        })
    }
})

// Articles
_.forEach(filtered_articles, (article) => {
    const {
        title = "",
        id = null,
        description = "",
        type = 2,
        folder_id = null,
        agent_id = 36008255312, // nsmith user ID
        status = 1,
        // tags = []
    } = article

    // if article exists
    if (_.isNumber(id)) {
        // update article
        freshdesk.updateArticle(id, {
            title,
            description,
            type,
            agent_id,
            status
        }, function (err, data) {
            if (_.isObject(err))
                console.log({id, errors: err.data.errors})
            else console.log(err || data)
        })
    } else {
        // create article
        freshdesk.createArticle(folder_id, {
            title,
            description,
            type,
            agent_id,
            status
        }, function (err, data) {
            if (_.isObject(err))
                console.log({id, errors: err.data.errors})
            else console.log(err || data)
        })
    }

})
