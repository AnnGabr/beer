import {combineReducers} from 'redux';

import landingBeerList from './landingBeerList';
import landingRequest from './landingRequest';
import favoritesBeerList from './favoritesBeerList';
import favoritesRequest from './favoritesRequest';
import favorites from './favorites';

export const rootReducer = combineReducers({
    landingBeerList, 
    landingRequest, 
    favoritesBeerList, 
    favoritesRequest,
    favorites
});