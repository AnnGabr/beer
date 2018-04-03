import { actionTypes } from '../actionTypes';
import createAction from './actionCreator';

import { isFetching, isAllFetched } from '../../reducers/landingBeerList';
import { getSearchParams } from '../../reducers/landingSearch';

import beerService from '../../services/beerService';
import mapper from '../../utils/beerMapper';

const fetchSearchResult = searchParams => (dispatch) => {
    if (searchParams) {
        dispatch(createAction(
            actionTypes.SEARCH_STARTED,
            searchParams
        ));
    }
    dispatch(fetchBeers());
};

const fetchBeers = () => (dispatch, getState) => {
    const state = getState();
    if (isFetching(state) || isAllFetched(state)) {
        return;
    }

    const { favorites } = state;

    dispatch(createAction(actionTypes.FETCH_LANDING_BEERS));

    return beerService
        .searchBeers(getSearchParams(state))
        .then((response) => {
            dispatch(createAction(
                actionTypes.LANDING_BEERS_FETCH_SUCCEEDED,
                mapper.mapToLandingModels(response, favorites.beerIds),
            ));
        })
        .catch((error) => {
            dispatch(createAction(
                actionTypes.LANDING_BEERS_FETCH_FAILED,
                error
            ));
        });
};

export default fetchSearchResult;
