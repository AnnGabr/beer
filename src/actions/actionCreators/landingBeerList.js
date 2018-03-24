import { actionTypes } from '../actionTypes';
import createAction from './actionCreator';

import * as beerApi from '../../api/beerFetchApi';
import { isFetching, isAllFetched } from '../../reducers/landingBeerList';
import { mapToLandingModels } from '../../utils/beerFilters';

export const fetchSearchResult = (searchParams) => (dispatch) => {
    if(searchParams) {
        dispatch(startSearch(searchParams));
        dispatch(fetchBeers());
    } else {
        dispatch(fetchMoreBeers());
    }
}

const startSearch = ({beerName, filter}) => {
    let searchParams = {};
    if(filter) {
        searchParams = {
            alcoholVolume: filter.alcoholVolume,
            internationalBitternessUnits: filter.internationalBitternessUnits,
            colorEbc: filter.colorEbc   
        }
    }
    searchParams.beerName = beerName;

    return createAction(actionTypes.SEARCH_STARTED, searchParams);
}

export const fetchBeers = (actionBeforeFetch = requestBeers) => (dispatch, getState) => {
    fetch(actionBeforeFetch, dispatch, getState);
}

const requestBeers = createAction(actionTypes.REQUEST_LANDING_BEERS);

export const fetchMoreBeers = (actionBeforeFetch = requestMoreBeers) => (dispatch, getState) => {
    fetch(actionBeforeFetch, dispatch, getState);
}

const requestMoreBeers = createAction(actionTypes.REQUEST_MORE_LANDING_BEERS);

const fetch = (
    actionBeforeFetch, 
    dispatch, 
    getState, 
    onSuccess = mapToLandingModels
) => {
    const state = getState();
    if(isFetching(state) || isAllFetched(state)) {
        return;
    }

    const { landingSearch, favorites } = state;

    dispatch(actionBeforeFetch);

    return beerApi.fetchBeers(landingSearch).then(response => {
        dispatch(createAction(
            actionTypes.LANDING_BEERS_FETCHED, 
            onSuccess(response, favorites.beerIds)
        ));
    }).catch(error => 
        dispatch(createAction(actionTypes.LANDING_BEERS_FETCH_FAILED, error))
    );
}



