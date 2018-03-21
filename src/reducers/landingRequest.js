import { actionTypes } from '../actions/actionTypes';
import { requestTypes } from '../utils/api';

const initialState = {
    type: requestTypes.GET_BY_NAME,
    urlParams: {
        page: 1,
        perPage: 9
    }
};

export default function landingRequest(state = initialState, action) {
    switch(action.type) {
        case actionTypes.SET_LANDING_DAFAULT_REQUEST:
            return {
                ...initialState
            };
        case actionTypes.SET_LANDING_REQUEST: 
            return {
                ...state,
                urlParams: {
                    ...state.urlParams,
                    ...action.payload.urlParams
                }
            };
        case actionTypes.LANDING_BEERS_FETCHED:
            return {
                ...state,
                urlParams: {
                    ...state.urlParams,
                    page: state.urlParams.page + 1
                }
            };
        default:
            return state;
    }
}