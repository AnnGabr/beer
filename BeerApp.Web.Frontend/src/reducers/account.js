import { actionTypes } from '../actions/actionTypes';

const initialState = {
    user: null,
    lastErrors: null
};

export default function account(state = initialState, action) {
    switch (action.type) {
    case actionTypes.SIGN_IN_REQUESTED:
        return {
            user: null,
            lastErrors: null
        };
    case actionTypes.SIGN_IN_SUCCEEDED:
        return {
            user: action.payload
        };
    case actionTypes.SIGN_IN_FAILED:
        return {
            lastErrors: action.payload
        };
    case actionTypes.CLEAR_ERRORS:
        return {
            ...state,
            lastErrors: null
        };
    case actionTypes.SIGN_OUT:
        return {
            user: null,
            lastErrors: null
        };
    default:
        return state;
    }
}

export const hasActiveUser = ({ account }) => account.user != null;

export const getUser = ({ account }) => account.user;

export const getLastErrors = ({ account }) => account.lastErrors;
