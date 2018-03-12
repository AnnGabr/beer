import { actionTypes } from '../actionTypes';
import { ROOT_URL } from '../../utils/api';

export const requestBeers = () => ({
    type: actionTypes.REQUEST_BEERS
});

export const receiveBeers = (beers) => ({
    type: actionTypes.BEERS_FETCHED,
    payload: beers
});

export const receiveBeersFailure = (error) => ({
    type: actionTypes.FETCH_BEERS_FAILED,
    payload: error
});

export const resetBeers = (beers) => ({ 
    type: actionTypes.RESET_BEERSS,
    payload: beers
});

export const requestTypes = {
    GET_BEERS: "GET_BEERS",
    GET_BY_IDS: "GET_BY_IDS",
    GET_BY_NAME: "GET_BY_NAME"
}

export const fetchBeers = (request) => {
    switch(request.type){
        case requestTypes.GET_BEERS:
            return fetchBeersDefault(request.urlParams);
        case requestTypes.GET_BY_IDS:
            return fetchBeersByIds(request.urlParams);
        case requestTypes.GET_BY_NAME:
            return fetchBeersByName(request.urlParams);
        default:
            throw new Error(`Unknown request type: ${request.type}`);
    }   
}

const fetchBeersDefault = ({page, perPage}) => 
    fetchBeersByUrl(ROOT_URL + `?page=${page}&per_page=${perPage}`);

const fetchBeersByIds = ({page, perPage, ids}) => {
    const idsUrlPart = Array.prototype.join.call(ids, '|');
    return fetchBeersByUrl(ROOT_URL + `?page=${page}&per_page=${perPage}` + `&ids=${idsUrlPart}`);
}

const fetchBeersByName = ({page, perPage, name, filters}) => {
    let beerInfoUrlPart = '&beer_name=' + name.trim().replace(/\s+/ig, '_');
    if(filters) {
        const { abv_lt, ibu_lt, ebc_lt } = filters;
        beerInfoUrlPart += `&abv_lt=${abv_lt}&ibu_lt=${ibu_lt}&ebc_lt=${ebc_lt}`;
    }
    return fetchBeersByUrl(ROOT_URL + `?page=${page}&per_page=${perPage}` + beerInfoUrlPart);
}

const fetchBeersByUrl = (url) => new Promise ((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
        if (this.status === 200) {
            resolve(this.response);
        } else {
            let error = new Error(this.statusText);
            error.code = this.status;
            reject(error);
        }
    };
    xhr.onerror = function() {
        reject(new Error("Network Error"))
    };
    
    xhr.send();
});

