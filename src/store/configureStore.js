import { rootReducer } from '../reducers';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import * as localStorage from '../api/localStorageApi';

export const STATE_KEY = 'state';

export const configureStore = () => {
    const middlewares = [thunk];
    if(process.env.NODE_ENV !== 'production') {
        middlewares.push(logger);
    }

    const persistedState = localStorage.getItem(STATE_KEY);

    const store = createStore(
        rootReducer, 
        persistedState,
        applyMiddleware(...middlewares)
    );

    return store;
}

export default configureStore;
