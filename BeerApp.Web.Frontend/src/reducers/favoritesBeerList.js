import { actionTypes } from '../actions/actionTypes';

const initialState = {
    pageNumber: 1,
    pagesCount: 0,
    perPageCount: 5,
    beers: [],
    loading: false,
    error: null,
};

export default function favoritesBeerList(state = initialState, { type, payload }) {
    switch (type) {
    case actionTypes.FETCH_FAVORITE_BEER_PAGE:
        return {
            ...state,
            loading: true,
            error: null,
            beers: []
        };
    case actionTypes.FAVORITE_BEER_PAGE_FETCH_SUCCEEDED:
        return {
            ...state,
            pageNumber: payload.pageNumber,
            pagesCount: payload.pagesCount,
            beers: payload.beers,
            loading: false
        };
    case actionTypes.FAVORITE_BEER_PAGE_FETCH_FAILED:
        return {
            ...state,
            pagesCount: 0,
            error: payload,
            loading: false
        };
    default:
        return state;
    }
}

export const getPagedFavoriteBeers = ({ favoritesBeerList }) => favoritesBeerList.beers;

export const getPagesCount = ({ favoritesBeerList }) => favoritesBeerList.pagesCount;

export const getPageNumber = ({ favoritesBeerList }) => favoritesBeerList.pageNumber;

export const getPerPageCount = ({ favoritesBeerList }) => favoritesBeerList.perPageCount;

export const isFetching = ({ favoritesBeerList }) => favoritesBeerList.loading;

export const isFetchFailed = ({ favoritesBeerList }) => favoritesBeerList.error;
