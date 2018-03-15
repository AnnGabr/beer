import { actionTypes } from '../actionTypes';
import * as api from '../../utils/api';
import { isFetching } from '../../reducers/beerList';

export const resetBeers = (beers) => ({ 
    type: actionTypes.RESET_BEERS,
    payload: beers
});

export const fetchBeers = (onSuccess) => (dispatch, getState) => {
    const state = getState();

    if(isFetching(state) || state.beerList.isAllFetched) {
        return;
    }

    const { request, favorites } = state;
    dispatch(requestBeers(request));

    return api.fetchBeers(request).then(response => 
        dispatch(receiveBeers(request, onSuccess(response, favorites.beerIds)))
    ).catch(error => 
        dispatch(receiveBeersFailure(error))
    );
}

const receiveBeers = (request, beers) => ({
    type: actionTypes.BEERS_FETCHED,
    payload: {
        beers,
        request
    }
});

const requestBeers = () => ({
    type: actionTypes.REQUEST_BEERS
});

const receiveBeersFailure = (error) => ({
    type: actionTypes.FETCH_BEERS_FAILED,
    payload: error
});


