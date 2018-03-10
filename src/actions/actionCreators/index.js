import { actionTypes } from "../actionTypes";

export function fetchBeers () { 
    return {
        type: actionTypes.FETCH_BEERS,
        payload: null 
    }
}

export function fetchBeersSuccess (beers) {
    return {
        type: actionTypes.BEERS_FETCHED,
        payload: beers
    }
}

export function fetchBeersFailure (error) {
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