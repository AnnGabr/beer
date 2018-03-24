import { actionTypes } from '../actions/actionTypes';

const initialState = {
    beers: [],
    loading: false,
    isAllFetched: false,
    error: null
}

export default function landingBeerList(state = initialState, {type, payload}) {
    switch(type) {
        case actionTypes.SEARCH_STARTED:
            return {...state,
                isAllFetched: false
            };
        case actionTypes.REQUEST_LANDING_BEERS:
            return {...initialState,
                loading: true
            };
        case actionTypes.REQUEST_MORE_LANDING_BEERS:
            return {...state, 
                loading: true
            };
        case actionTypes.LANDING_BEERS_FETCHED: 
            return {  
                beers: [...state.beers, ...payload], 
                loading: false, 
                isAllFetched: payload.length === 0,
                error: null
            };
        case actionTypes.LANDING_BEERS_FETCH_FAILED:
            return { 
                ...initialState, 
                error: payload
            };
        default:
            return state;
    }
}

export const isAllFetched = ({ landingBeerList }) => landingBeerList.isAllFetched;

export const isFetching = ({ landingBeerList }) => landingBeerList.loading;