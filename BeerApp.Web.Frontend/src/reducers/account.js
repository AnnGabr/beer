import { actionTypes } from '../actions/actionTypes';

const initialState = {
    user: null,
    lastErrors: null
};

export default function account(state = initialState, action) {
    switch (action.type) {
    case actionTypes.LOGIN_REQUESTED:
        return {
            user: null,
            lastErrors: null
        };
    case actionTypes.LOGIN_SUCCEEDED:
        return {
            user: action.payload
        };
    case actionTypes.LOGIN_FAILED:
        return {
            lastErrors: action.payload
        };
    default:
        return state;
    }
}

export const hasActiveUser = ({ account }) => account.user != null;

export const getUser = ({ account }) => account.user;

export const getLastErrors = ({ account }) => account.lastErrors;
