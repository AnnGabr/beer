import { actionTypes } from '../actionTypes';
import * as api from '../../utils/api';
import { isFetching, isAllFetched } from '../../reducers/landingBeerList';

export const resetBeers = (beers) => ({ 
    type: actionTypes.RESET_LANDING_BEERS,
    payload: beers
});

export const fetchBeers = (onSuccess) => (dispatch, getState) => {
    const state = getState();

    if(isFetching(state) || isAllFetched(state)) {
        return;
    }

    dispatch(requestBeers());

    const { landingRequest, favorites } = state;

    return api.fetchBeers(landingRequest).then(response => 
        dispatch(receiveBeers(onSuccess(response, favorites.beerIds)))
    ).catch(error => 
        dispatch(receiveBeersFailure(error))
    );
}

const receiveBeers = (beers) => ({
    type: actionTypes.LANDING_BEERS_FETCHED,
    payload: beers
});

const requestBeers = () => ({
    type: actionTypes.REQUEST_LANDING_BEERS
});

const receiveBeersFailure = (error) => ({
    type: actionTypes.FETCH_BEERS_FAILED,
    payload: error
});


