import { rootReducer } from '../reducers';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';

export const configureStore = () => {
    const middlewares = [thunk];
    if(process.env.NODE_ENV !== 'production') {
        middlewares.push(logger);
    }

    const persistedState = loadState();

    const store = createStore(
        rootReducer, 
        persistedState,
        applyMiddleware(...middlewares)
    );

    store.subscribe(throttle(() => {
        saveState({
            favorites: store.getState().favorites
        });
    }, 1000));

    return store;
}

export default configureStore;
