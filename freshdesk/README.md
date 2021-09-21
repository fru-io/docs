# Fru Docs

A documentation repository for user docs on support.Fru.io and dash.Fru.io

## Document Hierarchy
### Organization of Docs Source
Docs should be organized in a manner that reflects the rendered website.

While you can nest content at any level, however the top **2** levels (i.e. `docs/<DIRECTORIES>/<DIRECTORIES>`) are special and are considered the category and folder in Freshdesk respectively. However, we use front matter to manage the API integration so technically the article can live anywhere if there is a logical reason 🧐.

 **\* Freshdesk's** document hierarchy ONLY supports 2 levels of nesting, `<Category>/<Folder>/<Article>`.

  ``` shell
  .
  └── docs
      └── <Category>
          ├── _index.md           // <- https://docs.drud.com/<Category>/
          └── <Folder>
              ├── _index.md       // <- https://docs.drud.com/<Category>/<Folder>/
              ├── <Article1>.md   // <- https://docs.drud.com/<Category>/<Folder>/<Article1>/
              └── <Article2>.md   // <- https://docs.drud.com/<Category>/<Folder>/<Article2>/
  ```

#### Index Pages: `_index.md`
`_index.md` has a special role. It allows you to manage the content in Freshdesk for the Category and Folders with front matter data.

### Front-Matter
Front matter allows you to keep metadata attached to an instance of a content type—i.e., embedded inside a content file—and is one of the many features that makes this work.

**Category Example:**
  ``` yaml
  title: General                      # string - Name of the solution category
  description: General Support Docs   # string - Description of the solution category
  freshdesk:
    name: General                       # string - Name of the solution category
    id: 36000020154                     # number - Unique ID of the solution category
    taxonomy: category                  # string - Can be either 'category', 'folder' or empty for articles
    visible_in_portals: []              # array - List of portal IDs where this category is visible
  ```

**Folder Example:**
  ``` yaml
  title: Policies                 # string - Name of the solution folder
  description: Company policies.  # string - Description of the solution folder
  freshdesk:
    name: Policies            # name - string	Name of the solution folder
    id: 36000030822           # number - Unique ID of the solution folder id
    category_id: 36000020154  # number - Unique ID of the solution category id
    visibility: 1             # number - Accessibility of this folder.
    taxonomy: folder          # string - Can be either 'category', 'folder' or empty for articles
    company_ids: []           # array - IDs of the companies to whom this solution folder is visible
  ```

**Article Example:**
  ``` yaml
  title: Acceptable Use Policy  # string - Title of the article
  description:                  # string - Description of the solution article
  freshdesk:
    title: Acceptable Use Policy  # string - Title of the solution article
    id: 36000062122               # number - Unique ID of the solution article
    type: 1                       # number - The type of the solution article
    category_id: 36000020154      # number - ID of the category to which the solution article belongs
    folder_id: 36000030822        # number - ID of the folder to which the solution article belongs
    agent_id: 36008255312         # number - ID of the agent who created the solution article
    status: 2                     # number - Status of the solution article: 1 is draft, 2 is published
    tags: []                      # array - Tags that have been associated with the solution article
  ```


#### Freshdesk
In order to support Freshdesk's document hierarchy you will notice above that each piece of content has a `freshdesk` object. Without it, the content will NOT be imported into Freshdesk. Also notice the `taxonomy` value inside the object, for categories/folders. This is what the script looks for to filter out and determine content types. It doesn't look at the folder structure to determine where to place content.

  **Please Note**
  - `category_id`, `folder_id`, `agent_id` all come from Freshdesk manually at this point.
  - `id` can be left empty to create new article, folder, or category. However please update the repo with the ID, or it will keep creating new content. **All** `id`'s are coming from Freshdesk manually at this point. Create the new content manually in Freshdesk with no content to get the ID and when you deploy your new markdown it will update the content.

## Dev Setup
You can use this locally or with Docker.

### Local NPM/Node
Requires node >= 10 and npm >= 5

`npm install` then `npm run push` to deploy your updates.

### Docker
Requires Docker installed and running.

To start project - `docker-compose up`

To Deploy Updates - `npm run push:docker` or `docker-compose exec base npm run push`

To Pull Changes from Freshdesk - `npm run sync:docker` or `docker-compose exec base npm run sync`

