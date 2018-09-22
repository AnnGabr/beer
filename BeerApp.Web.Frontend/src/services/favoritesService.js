import * as api from '../api/apiCalls';

const ROOT_URL = '/favorites';

function add(punkBeerId) {
    const url = `${ROOT_URL}/${punkBeerId}`;

    return api.post(url);
}

function remove(beerId) {
    const url = `${ROOT_URL}/${beerId}`;

    return api.del(url);
}

function getPage(pageNumber, perPageCount) {
    const url = `${ROOT_URL}/${pageNumber}/${perPageCount}`;

    return api.get(url);
}

export default {
    add,
    remove,
    getPage
};
