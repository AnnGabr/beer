import { actionTypes } from '../actionTypes';
import createAction from './actionCreator';
import * as beerApi from '../../api/beerFetchApi';
import { mapToFavoritesModels } from '../../utils/beerFilters';

export const fetchBeers = (onSuccess = mapToFavoritesModels) => (dispatch, getState) => {
    dispatch(createAction(
        actionTypes.FETCH_FAVORITE_BEERS
    ));

    const { favoritesRequest, favorites } = getState();

    return beerApi.fetchBeers(getUrlParams(favoritesRequest)).then(response => {
        dispatch(createAction(
            actionTypes.FAVORITE_BEERS_FETCH_SUCCEEDED,
            onSuccess(response, favorites.beerIds)
        ));
    }).catch(error => {
        dispatch(createAction(
            actionTypes.FAVORITE_BEERS_FETCH_FAILED,
            error
        ));
    });
}

const getUrlParams = ({
    pageNumber, 
    beersPerPageCount, 
    beerIds
}) => {
    const startIndex = (pageNumber - 1) * beersPerPageCount;
    const endIndex = startIndex + beersPerPageCount;
    
    return {
        beerIds: beerIds.slice(startIndex, endIndex)
    };
}