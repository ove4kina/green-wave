import {
    fetchPage,
    fetchCamp,
    fetchArticle,
    fetchProgram,
    fetchReport,
    fetchCatalog,
    fetchCatalogItem
} from '../api'

export default {
    FETCH_PAGE: ({commit, state}, {url}) => {
        return state.pages[url]
            ? Promise.resolve(state.pages[url])
            : fetchPage(url).then(page => commit('SET_PAGE', {url, page}))
    },
    FETCH_CAMP: ({commit, state}, {url}) => {
        return state.camps[url]
            ? Promise.resolve(state.camps[url])
            : fetchCamp(url).then(camp => commit('SET_CAMP', {url, camp}))
    },
    FETCH_PROGRAM: ({commit, state}, {url}) => {
        return state.programs[url]
            ? Promise.resolve(state.programs[url])
            : fetchProgram(url).then(program => commit('SET_PROGRAM', {url, program}))
    },
    FETCH_ARTICLE: ({commit, state}, {url}) => {
        return state.articles[url]
            ? Promise.resolve(state.articles[url])
            : fetchArticle(url).then(article => commit('SET_ARTICLE', {url, article}))
    },
    FETCH_REPORT: ({commit, state}, {url}) => {
        return state.reports[url]
            ? Promise.resolve(state.reports[url])
            : fetchReport(url).then(report => commit('SET_REPORT', {url, report}))
    },
    FETCH_CATALOG: ({commit, state}, {url}) => {
        return state.catalogs[url]
            ? Promise.resolve(state.catalogs[url])
            : fetchCatalog(url).then(catalog => commit('SET_CATALOG', {url, catalog}))
    },
    FETCH_CATALOG_ITEMS: ({commit, state}, {url, urlItem}) => {
        let urlFormatted = url + '-' + urlItem;
        return state.catalogItems[urlFormatted]
            ? Promise.resolve(state.catalogs[urlFormatted])
            : fetchCatalogItem(url,urlItem).then(item => commit('SET_CATALOG_ITEM', {urlFormatted, item}))
    },
}
