import { actionTypes } from "../actions/actionTypes";

const initialState = {
    beers: [],
    loading: false,
    error: null
}

export default function beerList(state = initialState, action) {
    switch(action.type) {
        case actionTypes.REQUEST_BEERS:
            return {...state, loading: true};
        case actionTypes.BEERS_FETCHED:
            return {...state, beers: [...state.beers, ...action.payload], loading: false, error: null};
        case actionTypes.FETCH_BEERS_FAILED:
            return {...state, beers: null, loading: false, error: action.payload};
        case actionTypes.RESET_BEERS:
            return {...initialState, beers: []};
        default:
            return state;
    }
}