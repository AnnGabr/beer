import { actionTypes } from "../actions/actionTypes";

const test = [{
    name: "First",
    image_url: "https://images.punkapi.com/v2/192.png",
    tagline: "tweet",
    id: 0
},
{
    name: "First",
    image_url: "https://images.punkapi.com/v2/192.png",
    tagline: "tweet",
    id: 1
}
,
{
    name: "First",
    image_url: "https://images.punkapi.com/v2/192.png",
    tagline: "tweet",
    id: 2
}
,
{
    name: "First",
    image_url: "https://images.punkapi.com/v2/192.png",
    tagline: "tweet",
    id: 3
}
,
{
    name: "First",
    image_url: "https://images.punkapi.com/v2/192.png",
    tagline: "tweet",
    id: 4
}];

const initialState = {
    perPage: 9,
    nextPage: 1,
    beers: test,
    loading: false,
    error: null
}

export default function beerList(state = initialState, action) {
    console.log(state);
    switch(action.type) {
        case actionTypes.FETCH_BEERS:
            return {...state, loading: true, beers: []};
        case actionTypes.BEERS_FETCHED:
            return {...state, beers: [...state.beers, ...action.payload], loading: false, error: null, nextPage: ++state.nextPage};
        case actionTypes.FETCH_BEERS_FAILED:
            return {...state, beers: null, loading: false, error: action.payload};
        case actionTypes.RESET_BEERS:
            return {...initialState, beers: []};
        default:
            return state;
    }
}