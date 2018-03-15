import { actionTypes } from "../actions/actionTypes";

const initialState = {
    beerIds: []
};

export default function favorites(state = initialState, action) {
    switch(action.type) {
        case actionTypes.FAVORITES_CHANGED: 
            return { beerIds: action.payload };
        default:
            return state;
    }
}