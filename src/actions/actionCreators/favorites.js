import { actionTypes } from '../actionTypes';
import createAction from './actionCreator';

import favoritesService from '../../services/favoritesService';
import { removeBeerId, addBeerId, isFavorite } from '../../reducers/favorites';

export const saveFavoriteChange = (id, isMarkedAsFavorite) => (dispatch, getState) => {
    const state = getState();

    const isInFavorites = isFavorite(state, id);
    if (isInFavorites && !isMarkedAsFavorite) {
        const newFavoriteBeersIds = removeBeerId(state, id);
        saveFavorites(newFavoriteBeersIds, dispatch);
    } else if (!isInFavorites && isMarkedAsFavorite) {
        const newFavoriteBeersIds = addBeerId(state, id);
        saveFavorites(newFavoriteBeersIds, dispatch);
    }
};

function saveFavorites(newFavoriteBeersIds, dispatch) {
    favoritesService.set(newFavoriteBeersIds);

    dispatch(createAction(
        actionTypes.FAVORITES_CHANGED,
        newFavoriteBeersIds
    ));
}
