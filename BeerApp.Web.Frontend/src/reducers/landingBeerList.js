import { actionTypes } from '../actions/actionTypes';
import favoritesReducer from './favorites';

const initialState = {
    beers: [],
    loading: false,
    isAllFetched: false,
    error: null,
};

export default function landingBeerList(state = initialState, { type, payload }) {
    switch (type) {
    case actionTypes.SEARCH_STARTED:
        return {
            ...initialState,
        };
    case actionTypes.FETCH_LANDING_BEERS:
        return {
            ...state,
            loading: true,
        };
    case actionTypes.LANDING_BEERS_FETCH_SUCCEEDED:
        return {
            beers: [...state.beers, ...payload],
            loading: false,
            isAllFetched: payload.length === 0,
            error: null,
        };
    case actionTypes.LANDING_BEERS_FETCH_FAILED:
        return {
            ...initialState,
            error: payload,
        };
    case actionTypes.LANDING.REQUEST_FAVORITE_CHANGE:
    case actionTypes.LANDING.FAVORITE_ADDED:
    case actionTypes.LANDING.FAVORITE_REMOVED:
        return {
            ...state,
            beers: favoritesReducer(state.beers, { type, payload })
        };
    default:
        return state;
    }
}

export const isAllFetched = ({ landingBeerList }) => landingBeerList.isAllFetched;

export const isFetching = ({ landingBeerList }) => landingBeerList.loading;

export const getLandingBeerListState = ({ landingBeerList }) => landingBeerList;
