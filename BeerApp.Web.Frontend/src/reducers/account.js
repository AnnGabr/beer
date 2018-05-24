import { actionTypes } from '../actions/actionTypes';

const initialState = {
    user: {
        birthDate: new Date(),
        nickName: 'Ann',
        email: 'myemail@gmail.com'
    },
    lastErrors: null
};

export default function account(state = initialState, action) {
    switch (action.type) {
    case actionTypes.SIGN_OUT:
    case actionTypes.SIGN_IN_REQUESTED:
        return {
            user: null,
            lastErrors: null
        };
    case actionTypes.UPDATE_PROFILE_SUCCEEDED:
    case actionTypes.SIGN_IN_SUCCEEDED:
        return {
            user: action.payload
        };
    case actionTypes.UPDATE_PROFILE_FAILED:
    case actionTypes.SIGN_IN_FAILED:
        return {
            ...state,
            lastErrors: action.payload
        };
    case actionTypes.CLEAR_ERRORS:
        return {
            ...state,
            lastErrors: null
        };
    default:
        return state;
    }
}

export const hasActiveUser = ({ account }) => account.user != null;

export const getUser = ({ account }) => ({
    ...account.user
});

export const getLastErrors = ({ account }) => account.lastErrors;
