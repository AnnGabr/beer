import * as api from '../api/apiCalls';
import urlBuilder from '../utils/urlBuilder';

const ROOT_URL = '/beer';
const FAVORITES_ROOT_URL = 'favorites';

function getBeersByIds(ids) {
    const url = `${FAVORITES_ROOT_URL}?${urlBuilder.getBeerIdsUrlPart(ids)}`;
    return api.get(url);
}

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
    getBeersByIds,
    getBeerById
};
