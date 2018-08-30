import { actionTypes } from '../actions/actionTypes';

export default function favorites(beers, { type, payload }) {
    switch (type) {
    case actionTypes.LANDING.REQUEST_FAVORITE_CHANGE:
    case actionTypes.FAVORITES.REQUEST_FAVORITE_CHANGE:
        return [
            ...beers.map(beer =>
                (beer.punkId === payload) ?
                    {
                        ...beer, 
                        loading: true
                    }
                    : beer
            )
        ];
    case actionTypes.LANDING.FAVORITE_ADDED: 
        return [
            ...beers.map(beer =>
                (beer.punkId === payload.punkId) ?
                    {
                        ...beer, 
                        id: payload.id,
                        loading: false,
                        isFavorite: true
                    }
                    : beer
            )
        ];
    case actionTypes.LANDING.FAVORITE_REMOVED:
        return [
            ...beers.map(beer =>
                (beer.id === payload) ?
                    {
                        ...beer,
                        loading: false,
                        isFavorite: false
                    }
                    : beer
            )
        ];
    default:
        return beers;
    }
}
