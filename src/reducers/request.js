import { actionTypes } from '../actions/actionTypes';
import { requestTypes } from '../utils/api';

const initialState = {
    type: requestTypes.GET_BEERS,
    urlParams: {
        page: 1,
        perPage: 9
    },
    isAllFetched: false
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
            return {...state, 
                type: action.payload.type, 
                urlParams: {
                    ...initialState.urlParams,
                    ...action.payload.urlParams
                }
            };
        default:
            return state;
    }
}