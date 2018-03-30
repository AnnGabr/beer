import { actionTypes } from '../actionTypes';
import createAction from './actionCreator';

import beerService from '../../services/beerService';
import { mapToFavoritesModels } from '../../utils/beerFilters';

const fetchBeers = (favoriteBeersIds, onSuccess = mapToFavoritesModels) => (dispatch, getState) => {
    dispatch(createAction(actionTypes.FETCH_FAVORITE_BEERS));

    const { favorites } = getState();

    return beerService
        .getBeersByIds(favoriteBeersIds)
        .then((response) => {
            dispatch(createAction(
                actionTypes.FAVORITE_BEERS_FETCH_SUCCEEDED,
                onSuccess(response, favorites.beerIds),
            ));
        })
        .catch((error) => {
            dispatch(createAction(actionTypes.FAVORITE_BEERS_FETCH_FAILED, error));
        });
};

export default fetchBeers;
