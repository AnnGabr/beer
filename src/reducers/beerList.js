import { actionTypes } from '../actions/actionTypes';

const initialState = {
    beers: [],
    loading: false,
    isAllFetched: false,
    error: null
}

export default function beerList(state = initialState, action) {
    switch(action.type) {
        case actionTypes.REQUEST_BEERS:
            return {...state, 
                loading: true
            };
        case actionTypes.BEERS_FETCHED: 
            return {...state, 
                isAllFetched: isAllFetched(action.payload.beers), 
                beers: [...state.beers, ...action.payload.beers], 
                loading: false, 
                error: null
            };
        case actionTypes.FETCH_BEERS_FAILED:
            return {...state, 
                beers: null, 
                loading: false, 
                error: action.payload
            };
        case actionTypes.RESET_BEERS:
            return {...initialState};
        default:
            return state;
    }
}

const isAllFetched = (fetchedBeers) => (fetchedBeers.length === 0);

export const isFetching = ({ beerList }) => beerList.loading;