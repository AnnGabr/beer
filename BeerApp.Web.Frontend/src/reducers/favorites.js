import { actionTypes } from '../actions/actionTypes';

const initialState = {
    beerIds: []
};

export default function favorites(state = initialState, action) {
    switch (action.type) {
    case actionTypes.FAVORITES_CHANGED:
        return { beerIds: action.payload };
    case actionTypes.FAVORITE_BEER_PAGE_FETCH_SUCCEEDED:
        return {
            beerIds: action.payload.beers.map(beer => beer.id)
        };
    default:
        return state;
    }
}

export const isFavorite = ({ favorites }, beerId) => favorites.beerIds.includes(beerId);

export const getFavoriteBeersIds = ({ favorites }) => favorites.beerIds;

export const addBeerId = ({ favorites }, idToAdd) => [...favorites.beerIds, idToAdd];

export const removeBeerId = ({ favorites }, idToRemove) =>
    favorites.beerIds.filter(id => id !== idToRemove);
