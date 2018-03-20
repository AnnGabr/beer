import { actionTypes } from '../actions/actionTypes';
import { requestTypes } from '../utils/api';

const initialState = {
    type: requestTypes.GET_BY_IDS,
    urlParams: {
        page: 1,
        perPage: 5
    }
};

export default function favoritesRequest(state = initialState, action) {
    switch(action.type) {
        case actionTypes.SET_FAVORITES_REQUEST: 
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