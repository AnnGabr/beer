import { rootReducer } from '../reducers';
import { createStore } from 'redux';

//import { actionTypes } from '../actions/actionTypes';

export const store = createStore(rootReducer);

store.subscribe(() => {
    console.log(store.getState())
});
//store.dispatch({type: actionTypes.FETCH_BEERS });
//store.dispatch({type: actionTypes.FETCH_BEERS_FAILED, payload: "I can`t access the server."});
//store.dispatch({type: actionTypes.RESET_BEERS });
