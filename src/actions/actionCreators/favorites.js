import {actionTypes} from '../actionTypes';

import favoritesService from '../../services/favoritesService';

export const saveFavoriteChange = (id, isMarkedAsFavorite) => (dispatch, getState) => {
   const { favorites } = getState();

   const isInFavorites = favorites.beerIds.includes(id);
   if(isInFavorites && !isMarkedAsFavorite) {
        const newFavoriteBeerIds = removeBeerId(favorites.beerIds, id);
        saveFavorites(newFavoriteBeerIds, dispatch);    
   }else if(!isInFavorites &&  isMarkedAsFavorite){
        const newFavoriteBeerIds = addBeerId(favorites.beerIds, id);
        saveFavorites(newFavoriteBeerIds, dispatch);
   }
}; 

function saveFavorites(newFavoriteBeerIds, dispatch) {
    favoritesService.set(newFavoriteBeerIds);
    
    dispatch(changeFavorites(newFavoriteBeerIds));
}

const addBeerId = (beerIds, idToAdd) => beerIds.concat(idToAdd);

const removeBeerId = (beerIds, idToRemove) => beerIds.filter((id) => id !== idToRemove);

const changeFavorites = (newFavoriteBeerIds) => ({
    type: actionTypes.FAVORITES_CHANGED,
    payload: newFavoriteBeerIds
});