import * as api from '../api/apiCalls';
import urlBuilder from '../utils/urlBuilder';

const ROOT_URL = '/beer';

function getBeerById(id) {
    const url = `${ROOT_URL}/${id}`;
    return api.get(url);
}

function searchBeers(urlParams) {
    const url = `${ROOT_URL}${urlBuilder.buildSearchQuery(urlParams)}`;
    return api.get(url);
}

export default {
    searchBeers,
    getBeerById
};
