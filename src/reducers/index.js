import { combineReducers } from 'redux';

import landingBeerList from './landingBeerList';
import favoritesBeerList from './favoritesBeerList';
import favorites from './favorites';
import landingSearch from './landingSearch';

export const rootReducer = combineReducers({
    landingBeerList,
    favoritesBeerList,
    favorites,
    landingSearch,
});
