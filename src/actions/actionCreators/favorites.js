import {actionTypes} from '../actionTypes';
import {setRequest} from '../actionCreators/request';
import {fetchBeers} from '../actionCreators/beerList';

import {retrieveExpanded} from '../../utils/beers-filters';

import * as localStorage from '../../store/localStorage';

export const fetchFavorites = (page, perPage) => (dispatch, getState) => {
    dispatch(setRequest(
        getFavoritesRequest(page, perPage, getState().favorites.beerIds)
    ));
    dispatch(fetchBeers(retrieveExpanded));
}

const getFavoritesRequest = (page, perPage, ids) =>({
    type: "GET_BY_IDS",
    urlParams: {
        page: page,
        perPage: perPage,
        ids: ids
    }
});

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
    localStorage.saveState({
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