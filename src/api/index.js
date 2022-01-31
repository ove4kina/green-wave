import axios from 'axios'

let site = 'http://green-wave-api.burno.tech';
// let site = 'http://localhost:3333';

export function fetchPage(url) {
    return axios({
        method: 'post',
        url: site + '/api/page/' + url
    })
        .then(function (response) {
            return response.data;
        }).catch(function (error) {
            return '404';
        });
}

export function fetchCamp(url) {
    return axios({
        method: 'post',
        url: site + '/api/camp/' + url
    })
        .then(function (response) {
            return response.data;
        }).catch(function (error) {
            return '404';
        });
}

export function fetchProgram(url) {
    return axios({
        method: 'post',
        url: site + '/api/program/' + url
    })
        .then(function (response) {
            return response.data;
        }).catch(function (error) {
            return '404';
        });
}

export function fetchArticle(url) {
    return axios({
        method: 'post',
        url: site + '/api/article/' + url
    })
        .then(function (response) {
            return response.data;
        }).catch(function (error) {
            return '404';
        });
}

export function fetchReport(url) {
    return axios({
        method: 'post',
        url: site + '/api/report/' + url
    })
        .then(function (response) {
            return response.data;
        }).catch(function (error) {
            return '404';
        });
}

export function fetchCatalog(url) {
    return axios({
        method: 'post',
        url: site + '/api/catalog/' + url
    })
        .then(function (response) {
            return response.data;
        }).catch(function (error) {
            return '404';
        });
}

export function fetchCatalogItem(url, urlItem) {
    return axios({
        method: 'post',
        url: site + '/api/catalog/' + url + '/' + urlItem
    })
        .then(function (response) {
            return response.data;
        }).catch(function (error) {
            return '404';
        });
}