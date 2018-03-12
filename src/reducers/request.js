import { actionTypes } from "../actions/actionTypes";
import { requestTypes } from '../actions/actionCreators/beerList';

const initialState = {
    type: requestTypes.GET_BEERS,
    urlParams: {
        page: 1,
        perPage: 9
    }
};

export default function request(state = initialState, action) {
    switch(action.type) {
        case actionTypes.BEERS_FETCHED:
            return {...state, urlParams: {...state.urlParams, page: state.urlParams.page + 1}};
        case actionTypes.RESET_BEERS:
            return {...initialState};
        default:
            return state;
    }
}