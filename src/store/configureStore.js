import { rootReducer } from '../reducers';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { loadFavorites } from '../api/favoritesService';;

export const configureStore = () => {
    const middlewares = [thunk];
    if(process.env.NODE_ENV !== 'production') {
        middlewares.push(logger);
    }

    const initialState = {
        favorites: loadFavorites() || undefined
    };

    const store = createStore(
        rootReducer, 
        initialState,
        applyMiddleware(...middlewares)
    );

    return store;
}

export default configureStore;
