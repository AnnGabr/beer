import { actionTypes } from '../actionTypes';
import * as api from '../../utils/api';
import { isFetching, isAllFetched } from '../../reducers/landingBeerList';

export const fetchBeers = (onSuccess, beforeFetchAction = requestBeers) => (dispatch, getState) => 
    fetch(onSuccess, beforeFetchAction, dispatch, getState);

export const fetchMoreBeers = (onSuccess, beforeFetchAction = requestMoreBeers) => (dispatch, getState) => 
    fetch(onSuccess, beforeFetchAction, dispatch, getState);

const fetch = (onSuccess, beforeFetchAction, dispatch, getState) => {
    const state = getState();
    if(isFetching(state) || isAllFetched(state)) {
        return;
    }

    const { landingRequest, favorites } = state;

    dispatch(beforeFetchAction());

    return api.fetchBeers(landingRequest).then(response => {
        dispatch(receiveBeers(onSuccess(response, favorites.beerIds)))
    }).catch(error => 
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

const requestMoreBeers = () => ({
    type: actionTypes.REQUEST_MORE_LANDING_BEERS
});

const receiveBeersFailure = (error) => ({
    type: actionTypes.FETCH_BEERS_FAILED,
    payload: error
});


