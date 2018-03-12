import {combineReducers} from 'redux';
import beerList from './beerList';
import favorites from './favorites';

export const rootReducer = combineReducers({
    beerList, favorites
});