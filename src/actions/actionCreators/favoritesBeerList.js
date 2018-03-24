import { actionTypes } from '../actionTypes';
import * as beerApi from '../../api/beerFetchApi';
import { isFetching } from '../../reducers/favoritesBeerList';
import { mapToFavoritesModels } from '../../utils/beerFilters';

export const fetchBeers = (onSuccess = mapToFavoritesModels) => (dispatch, getState) => {
    const state = getState();

    if(isFetching(state)) {
        return;
    }

    dispatch(requestBeers());

    const { favoritesRequest, favorites } = state;

    return beerApi.fetchBeers(favoritesRequest).then(response => 
        dispatch(receiveBeers(onSuccess(response, favorites.beerIds)))
    ).catch(error => 
        dispatch(receiveBeersFailure(error))
    );
}

const receiveBeers = (beers) => ({
    type: actionTypes.FAVORITES_BEERS_FETCHED_SUCCEEDED,
    payload: beers
});

const requestBeers = () => ({
    type: actionTypes.FETCH_FAVORITES_BEERS
});

const receiveBeersFailure = (error) => ({
    type: actionTypes.FAVORITES_BEERS_FETCH_FAILED,
    payload: error
});