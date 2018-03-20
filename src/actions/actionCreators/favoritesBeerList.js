import { actionTypes } from '../actionTypes';
import * as api from '../../utils/api';
import { isFetching} from '../../reducers/favoritesBeerList';

export const fetchBeers = (onSuccess) => (dispatch, getState) => {
    const state = getState();

    if(isFetching(state)) {
        return;
    }

    dispatch(requestBeers());

    const { favoritesRequest, favorites } = state;

    return api.fetchBeers(favoritesRequest).then(response => 
        dispatch(receiveBeers(onSuccess(response, favorites.beerIds)))
    ).catch(error => 
        dispatch(receiveBeersFailure(error))
    );
}

const receiveBeers = (beers) => ({
    type: actionTypes.FAVORITES_BEERS_FETCHED,
    payload: beers
});

const requestBeers = () => ({
    type: actionTypes.REQUEST_FAVORITES_BEERS
});

const receiveBeersFailure = (error) => ({
    type: actionTypes.FAVORITES_BEERS_FETCH_FAILED,
    payload: error
});