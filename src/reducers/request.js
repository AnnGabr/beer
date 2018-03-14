import { actionTypes } from '../actions/actionTypes';
import { requestTypes } from '../utils/api';

const initialState = {
    type: requestTypes.GET_BY_NAME,
    urlParams: {
        page: 1,
        perPage: 9
    }
};

export default function request(state = initialState, action) {
    switch(action.type) {
        case actionTypes.BEERS_FETCHED: 
            return {...state, 
                urlParams: {
                    ...state.urlParams, 
                    page: state.urlParams.page + 1
                }
            };
        case actionTypes.SET_REQUEST: 
            return {
                type: action.payload.type || state.type,
                urlParams: {
                    ...state.urlParams,
                    ...action.payload.urlParams,
                    ...initialState.urlParams
                }
            };
        default:
            return state;
    }
}