import { actionTypes } from '../actions/actionTypes';

const initialState = {
    beers: [],
    loading: false,
    error: null
}

export default function favoritesBeerList(state = initialState, {type, payload}) {
    switch(type) {
        case actionTypes.FETCH_FAVORITES_BEERS:
            return {
                ...initialState,
                loading: true
            };
        case actionTypes.FAVORITES_BEERS_FETCHED_SUCCEEDED: 
            return {  
                beers: [...payload], 
                loading: false, 
                error: null
            };
        case actionTypes.FAVORITES_BEERS_FETCH_FAILED:
            return { 
                ...initialState, 
                error: payload
            };
        default:
            return state;
    }
}

export const isFetching = ({ favoritesBeerList }) => favoritesBeerList.loading;