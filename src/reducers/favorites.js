import { actionTypes } from "../actions/actionTypes";

const initialState = {
    beerIds: []
};

export default function favorites(state = initialState, action) {
    switch(action.type) {
        case actionTypes.FAVORITE_ADDED: 
            return {
                beerIds: addBeerId(state.beerIds, action.payload)
            };
        case actionTypes.FAVORITE_REMOVED: 
            return {
                beerIds: removeBeerId(state.beerIds, action.payload) 
            };
        default:
            return state;
    }
}

const addBeerId = (beerIds, id) => beerIds.concat(id);
const removeBeerId = (beerIds, idToRemove) => beerIds.filter((id) => id !== idToRemove);