import { actionTypes } from '../actionTypes';
import * as beerApi from '../../api/beerFetchApi';
import { isFetching, isAllFetched } from '../../reducers/landingBeerList';
import { mapToLandingModels } from '../../utils/beerFilters';

export const fetchBeers = (beforeFetchAction = requestBeers) => (dispatch, getState) => 
    fetch(beforeFetchAction, dispatch, getState);

export const fetchMoreBeers = (beforeFetchAction = requestMoreBeers) => (dispatch, getState) => 
    fetch(beforeFetchAction, dispatch, getState);

const fetch = (beforeFetchAction, dispatch, getState, onSuccess = mapToLandingModels) => {
    const state = getState();
    if(isFetching(state) || isAllFetched(state)) {
        return;
    }

    const { landingRequest, favorites } = state;

    dispatch(beforeFetchAction());

    return beerApi.fetchBeers(landingRequest).then(response => {
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
    type: actionTypes.LANDING_BEERS_FETCH_FAILED,
    payload: error
});


