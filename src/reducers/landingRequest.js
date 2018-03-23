import { actionTypes } from '../actions/actionTypes';

const initialState = {
    pageNumber: 1,
    beersPerPageCount: 9
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
                ...action.payload
            };
        case actionTypes.LANDING_BEERS_FETCHED:
            return {
                ...state,
                pageNumber: state.pageNumber + 1
            };
        default:
            return state;
    }
}