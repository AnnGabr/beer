import { actionTypes } from '../actionTypes';
import createAction from './actionCreator';
import * as beerApi from '../../api/beerFetchApi';
import { mapToFavoritesModels } from '../../utils/beerFilters';

const getUrlParams = ({ favoriteBeersIds }) => ({
    beerIds: favoriteBeersIds,
});

const fetchBeers = (fetchParams, onSuccess = mapToFavoritesModels) => (dispatch, getState) => {
    dispatch(createAction(actionTypes.FETCH_FAVORITE_BEERS));

    const { favorites } = getState();

    return beerApi
        .fetchBeers(getUrlParams(fetchParams))
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
