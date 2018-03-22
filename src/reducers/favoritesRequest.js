import { actionTypes } from '../actions/actionTypes';

const initialState = {
    pageNumber: 1,
    beersPerPageCount: 5
};

export default function favoritesRequest(state = initialState, action) {
    switch(action.type) {
        case actionTypes.SET_FAVORITES_REQUEST: 
            return {
                    ...state,
                    ...action.payload
            };
        default:
            return state;
    }
}