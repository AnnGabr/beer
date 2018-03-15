import {actionTypes} from '../actionTypes';

export const saveFavoriteChange = (id, isFavorite) => (dispatch, getState) => {
   const { favorites } = getState();

   const includes = favorites.beerIds.includes(id);
   if(includes && !isFavorite) {
        dispatch(removeFavorite(id));
   }else if(!includes && isFavorite){
        dispatch(addFavorite(id));
   }
};

const addFavorite = (id) => ({
    type: actionTypes.FAVORITE_ADDED,
    payload: id
});

const removeFavorite = (id) => ({
    type: actionTypes.FAVORITE_REMOVED,
    payload: id
});