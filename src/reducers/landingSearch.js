import { actionTypes } from '../actions/actionTypes';

const initialState = {
    pageNumber: 1,
    beersPerPageCount: 9
};

export default function landingSearch(state = initialState, action) {
    switch(action.type) {
        case actionTypes.SEARCH_STARTED:
            return {
                ...initialState,
                ...action.payload
            };
        case actionTypes.LANDING_BEERS_FETCH_SUCCEEDED:
            return {
                ...state,
                pageNumber: state.pageNumber + 1
            };
        default:
            return state;
    }
}