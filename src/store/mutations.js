import Vue from 'vue'

export default {
    SET_PAGE: (state, {url, page}) => {
        Vue.set(state.pages, url, page)
    },
    SET_CAMP: (state, {url, camp}) => {
        Vue.set(state.camps, url, camp)
    },
    SET_PROGRAM: (state, {url, program}) => {
        Vue.set(state.programs, url, program)
    },
    SET_ARTICLE: (state, {url, article}) => {
        Vue.set(state.articles, url, article)
    },
    SET_REPORT: (state, {url, report}) => {
        Vue.set(state.reports, url, report)
    },
    SET_CATALOG: (state, {url, catalog}) => {
        Vue.set(state.catalogs, url, catalog)
    },
    SET_CATALOG_ITEM: (state, {urlFormatted, item}) => {
        Vue.set(state.catalogItems, urlFormatted, item)
    },
}
