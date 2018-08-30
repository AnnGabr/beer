import { actionTypes } from '../actionTypes';
import createAction from './actionCreator';

import favoritesService from '../../services/favoritesService';

export const changeFavoriteOnFavoritesPage = favorite => dispatch => {
    dispatch(createAction(
        actionTypes.FAVORITES.REQUEST_FAVORITE_CHANGE,
        favorite.punkId
    ));

    return favoritesService.remove(favorite.id)
        .then(() => {
            dispatch(createAction(actionTypes.FAVORITES.FAVORITE_REMOVED));
        });
};

export const changeFavoriteOnLandingPage = (favorite, isMarkedAsFavorite) => dispatch => {
    dispatch(createAction(
        actionTypes.LANDING.REQUEST_FAVORITE_CHANGE,
        favorite.punkId
    ));

    if (isMarkedAsFavorite) {
        return favoritesService.remove(favorite.id)
            .then(() => {
                dispatch(createAction(
                    actionTypes.LANDING.FAVORITE_REMOVED,
                    favorite.id
                ))
            });
    } 

    return favoritesService.add(favorite.punkId)
        .then(({ id }) => {
            dispatch(createAction(
                actionTypes.LANDING.FAVORITE_ADDED,
                {id, punkId: favorite.punkId}
            ));
        });
};
