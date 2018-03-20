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
        case actionTypes.LANDING_BEERS_RESET: 
            return {...state, 
                urlParams: {
                    ...state.urlParams, 
                    page: 1
                }
            };
        case actionTypes.LANDING_BEERS_MORE_FETCHED:
        case actionTypes.LANDING_BEERS_FETCHED: 
            return {...state, 
                urlParams: {
                    ...state.urlParams, 
                    page: state.urlParams.page + 1
                }
            };
        case actionTypes.SET_LANDING_REQUEST: 
            return {
                ...state,
                urlParams: {
                    ...state.urlParams,
                    ...action.payload.urlParams
                }
            };
        default:
            return state;
    }
}