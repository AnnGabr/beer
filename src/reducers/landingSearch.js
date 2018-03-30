import { actionTypes } from '../actions/actionTypes';

const initialState = {
    pageNumber: 1,
    beersPerPageCount: 9,
    filter: null,
    beerName: null
};

export default function landingSearch(state = initialState, action) {
    switch (action.type) {
    case actionTypes.SEARCH_STARTED:
        return {
            ...initialState,
            ...action.payload,
        };
    case actionTypes.LANDING_BEERS_FETCH_SUCCEEDED:
        return {
            ...state,
            pageNumber: state.pageNumber + 1,
        };
    default:
        return state;
    }
}

export const getSearchParams = ({ landingSearch }) => {
    const { filter, beerName, pageNumber, beersPerPageCount } = landingSearch;
    const searchParams = {
        beerName,
        pageNumber,
        beersPerPageCount
    };
    if (filter) {
        searchParams.alcoholVolume = filter.alcoholVolume;
        searchParams.internationalBitternessUnits = filter.internationalBitternessUnits;
        searchParams.colorEbc = filter.colorEbc;
    }

    return searchParams;
}
