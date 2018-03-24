import {combineReducers} from 'redux';

import landingBeerList from './landingBeerList';
import favoritesBeerList from './favoritesBeerList';
import favoritesRequest from './favoritesRequest';
import favorites from './favorites';
import landingSearch from './landingSearch';

export const rootReducer = combineReducers({
    landingBeerList,  
    favoritesBeerList, 
    favoritesRequest,
    favorites,
    landingSearch
});