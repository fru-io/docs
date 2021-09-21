const Freshdesk = require("freshdesk-api")
const { makeRequest } = require("freshdesk-api/lib/utils")

class FruFreshdesk extends Freshdesk {

    /**
	 * Freshdesk APIv2 client
	 *
	 * @class
	 * @param {string} baseUrl    Base URL for the API calls, for example `https://demo.freshdesk.com`
	 * @param {string} apiKey     API key
	 * @public
	 */
    constructor (baseUrl, apiKey) {
        super(baseUrl, apiKey)
    }

    createSolutionsCategory(data, cb) {
        makeRequest("POST", this._auth, `${this.baseUrl}/api/v2/solutions/categories`, null, data, cb)
    }

    updateSolutionsCategory(id, data, cb) {
        makeRequest("PUT", this._auth, `${this.baseUrl}/api/v2/solutions/categories/${id}`, null, data, cb)
    }

    getSolutionsCategories(params, cb) {
        makeRequest("GET", this._auth, `${this.baseUrl}/api/v2/solutions/categories`, params, null, cb)
    }

    createSolutionsFolder(id, data, cb) {
        makeRequest("POST", this._auth, `${this.baseUrl}/api/v2/solutions/categories/${id}/folders`, null, data, cb)
    }

    updateSolutionsFolder(id, data, cb) {
        makeRequest("PUT", this._auth, `${this.baseUrl}/api/v2/solutions/folders/${id}`, null, data, cb)
    }

    getSolutionFolders(id, cb) {
        makeRequest("GET", this._auth, `${this.baseUrl}/api/v2/solutions/categories/${id}/folders`, null, null, cb)
    }

    getSolutionFolderArticles(id, cb) {
        makeRequest("GET", this._auth, `${this.baseUrl}/api/v2/solutions/folders/${id}/articles`, null, null, cb)
    }

    createArticle(id, data, cb) {
        makeRequest("POST", this._auth, `${this.baseUrl}/api/v2/solutions/folders/${id}/articles`, null, data, cb)
    }

    updateArticle(id, data, cb) {
        makeRequest("PUT", this._auth, `${this.baseUrl}/api/v2/solutions/articles/${id}`, null, data, cb)
    }

}
module.exports = FruFreshdesk