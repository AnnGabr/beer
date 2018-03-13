import { actionTypes } from '../actions/actionTypes';

const initialState = {
    beers: [],
    loading: false,
    isAllFetched: false,
    error: null
}

export default function beerList(state = initialState, {type, payload}) {
    switch(type) {
        case actionTypes.REQUEST_BEERS:
            return {...state, 
                loading: true
            };
        case actionTypes.BEERS_FETCHED: 
            return {  
                beers: [...state.beers, ...payload.beers], 
                loading: false, 
                isAllFetched: isAllFetched(payload.beers),
                error: null
            };
        case actionTypes.FETCH_BEERS_FAILED:
            return { 
                ...initialState, 
                error: payload
            };
        case actionTypes.RESET_BEERS:
            return {...initialState};
        default:
            return state;
    }
}

const isAllFetched = (fetchedBeers) => (fetchedBeers.length === 0);

export const isFetching = ({ beerList }) => beerList.loading;