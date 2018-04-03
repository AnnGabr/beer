import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { rootReducer } from '../reducers';

import favoritesService from '../services/favoritesService';

export const configureStore = () => {
    const middlewares = [thunk];
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(logger);
    }

    const initialState = {
        favorites: favoritesService.get() || undefined,
    };

    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(...middlewares),
    );

    return store;
};

export default configureStore;
