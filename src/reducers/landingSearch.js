import { actionTypes } from '../actions/actionTypes';

const initialState = {
    pageNumber: 1,
    beersPerPageCount: 9
};

export default function landingSearch(state = initialState, action) {
    switch(action.type) {
        case actionTypes.SEARCH_STARTED:
            return {
                ...state,
                ...action.payload,
                pageNumber: 1
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