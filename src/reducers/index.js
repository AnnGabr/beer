import {combineReducers} from 'redux';
import beerList from './beerList';
import favorites from './favorites';
import request from './request';

export const rootReducer = combineReducers({
    beerList, favorites, request
});