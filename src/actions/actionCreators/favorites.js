import {actionTypes} from '../actionTypes';

import * as localStorage from '../../api/localStorageApi';
import { STATE_KEY } from '../../store/configureStore';

export const saveFavoriteChange = (id, isFavorite) => (dispatch, getState) => {
   const { favorites } = getState();

   const includes = favorites.beerIds.includes(id);
   if(includes && !isFavorite) {
        const newFavorites = removeBeerId(favorites.beerIds, id);
        saveFavorites(newFavorites, dispatch);    
   }else if(!includes && isFavorite){
        const newFavorites = addBeerId(favorites.beerIds, id);
        saveFavorites(newFavorites, dispatch);
   }
}; 

function saveFavorites(newFavorites, dispatch) {
    localStorage.setItem(STATE_KEY, {
        favorites: {
            beerIds: newFavorites
        }
    });
    dispatch(changeFavorites(newFavorites));
}

const addBeerId = (beerIds, id) => beerIds.concat(id);

const removeBeerId = (beerIds, idToRemove) => beerIds.filter((id) => id !== idToRemove);

const changeFavorites = (newFavorites) => ({
    type: actionTypes.FAVORITES_CHANGED,
    payload: newFavorites
});