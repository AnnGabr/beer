import { actionTypes } from '../actionTypes';
import createAction from './actionCreator';

import favoritesService from '../../services/favoritesService';

export const saveFavoriteChange = (id, isMarkedAsFavorite) => (dispatch, getState) => {
    const { favorites } = getState();

    const isInFavorites = favorites.beerIds.includes(id);
    if (isInFavorites && !isMarkedAsFavorite) {
        const newFavoriteBeersIds = removeBeerId(favorites.beerIds, id);
        saveFavorites(newFavoriteBeersIds, dispatch);
    } else if (!isInFavorites && isMarkedAsFavorite) {
        const newFavoriteBeersIds = addBeerId(favorites.beerIds, id);
        saveFavorites(newFavoriteBeersIds, dispatch);
    }
};

function saveFavorites(newFavoriteBeersIds, dispatch) {
    favoritesService.set(newFavoriteBeersIds);

    dispatch(createAction(actionTypes.FAVORITES_CHANGED, newFavoriteBeersIds));
}

const addBeerId = (beerIds, idToAdd) => beerIds.concat(idToAdd);

const removeBeerId = (beerIds, idToRemove) => beerIds.filter(id => id !== idToRemove);
