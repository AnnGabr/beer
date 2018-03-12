import { rootReducer } from '../reducers';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';

export const configureStore = () => {
    const middlewares = [];
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


//import { actionTypes } from '../actions/actionTypes';

//store.dispatch({type: actionTypes.FETCH_BEERS });
//store.dispatch({type: actionTypes.FETCH_BEERS_FAILED, payload: "I can`t access the server."});
//store.dispatch({type: actionTypes.RESET_BEERS });
