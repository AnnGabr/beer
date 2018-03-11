import { actionTypes } from '../actionTypes';
import { ROOT_URL } from '../../utils/api';

export const requestBeers = () => ({
        type: actionTypes.REQUEST_BEERS
});

export const receiveBeers = (beers) => ({
        type: actionTypes.BEERS_FETCHED,
        payload: beers
});

export function receiveBeersFailure (error) {
    return {
        type: actionTypes.FETCH_BEERS_FAILED,
        payload: error
    }
}

export function resetBeers (beers) { 
    return {
        type: actionTypes.RESET_BEERSS,
        payload: beers
    }
}

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

const fetchBeersDefault = ({page, perPage}) => new Promise ((resolve, reject) => {
        const url = ROOT_URL + `?page=${page}&per_page=${perPage}`;
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
    }
);

const fetchBeersByIds = () => {

}

const fetchBeersByName = () => {

}

