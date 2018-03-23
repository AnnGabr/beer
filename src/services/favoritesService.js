import * as localStorage from './localStorageService';

const FAVORITES_KEY = 'favorites';

export const saveFavorites = (beerIds) => {
    localStorage.setItem(FAVORITES_KEY, { 
        beerIds: beerIds
     });
}

export const loadFavorites = () => {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    
    return favorites;
}