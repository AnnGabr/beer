import { actionTypes } from '../actionTypes';
import createAction from './actionCreator';

import beerService from '../../services/beerService';
import { isFetching, isAllFetched } from '../../reducers/landingBeerList';
import { mapToLandingModels } from '../../utils/beerFilters';

const fetchSearchResult = searchParams => (dispatch) => {
    if (searchParams) {
        dispatch(startSearch(searchParams));
    }
    dispatch(fetchBeers());
};

const startSearch = ({ beerName, filter }) => {
    let searchParams = {};
    if (filter) {
        searchParams = {
            alcoholVolume: filter.alcoholVolume,
            internationalBitternessUnits: filter.internationalBitternessUnits,
            colorEbc: filter.colorEbc,
        };
    }
    searchParams.beerName = beerName;

    return createAction(actionTypes.SEARCH_STARTED, searchParams);
};

const fetchBeers = (onSuccess = mapToLandingModels) => (dispatch, getState) => {
    const state = getState();
    if (isFetching(state) || isAllFetched(state)) {
        return;
    }

    const { landingSearch, favorites } = state;

    dispatch(createAction(actionTypes.FETCH_LANDING_BEERS));

    return beerService
        .searchBeers(landingSearch)
        .then((response) => {
            dispatch(createAction(
                actionTypes.LANDING_BEERS_FETCH_SUCCEEDED,
                onSuccess(response, favorites.beerIds),
            ));
        })
        .catch((error) => {
            dispatch(createAction(actionTypes.LANDING_BEERS_FETCH_FAILED, error));
        });
};

export default fetchSearchResult;
