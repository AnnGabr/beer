import { actionTypes } from '../actionTypes';
import createAction from './actionCreator';

import favoritesService from '../../services/favoritesService';
import { getPerPageCount } from '../../reducers/favoritesBeerList';
import mapper from '../../utils/favoritesPageMapper';

export const loadPage = pageNumber => (dispatch, getStore) => {
    dispatch(createAction(actionTypes.FETCH_FAVORITE_BEER_PAGE));

    return getPage(pageNumber, dispatch, getStore);
};

export const reloadPage = pageNumber => (dispatch, getStore) =>
    getPage(pageNumber, dispatch, getStore);

function getPage(pageNumber, dispatch, getStore) {
    const perPageCount = getPerPageCount(getStore());

    return favoritesService
        .getPage(pageNumber, perPageCount)
        .then((response) => {
            dispatch(createAction(
                actionTypes.FAVORITE_BEER_PAGE_FETCH_SUCCEEDED,
                mapper.mapToFavoritesPage(response),
            ));
        })
        .catch((error) => {
            dispatch(createAction(
                actionTypes.FAVORITE_BEER_PAGE_FETCH_FAILED,
                error
            ));
        });
}
