import { actionTypes } from '../actionTypes';
import createAction from './actionCreator';

import beerService from '../../services/beerService';
import mapper from '../../utils/beerMapper';

const fetchBeers = favoriteBeersIds => (dispatch, getState) => {
    dispatch(createAction(actionTypes.FETCH_FAVORITE_BEERS));

    return beerService
        .getBeersByIds(favoriteBeersIds)
        .then((response) => {
            dispatch(createAction(
                actionTypes.FAVORITE_BEERS_FETCH_SUCCEEDED,
                mapper.mapToFavoritesModels(response),
            ));
        })
        .catch((error) => {
            dispatch(createAction(actionTypes.FAVORITE_BEERS_FETCH_FAILED, error));
        });
};

export default fetchBeers;
