import { actionTypes } from '../actions/actionTypes';

import cloudinary from '../services/cloudinaryService';

const initialState = {
    user: {
        birthDate: new Date(),
        nickName: 'Ann',
        email: 'myemail@gmail.com',
        avatarImageName: 'paporotnik_list_rastenie_zelenyj_119970_1920x1080'
    },
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

export const getUser = ({ account }) => ({
    ...account.user,
    avatarUrl: cloudinary.getImageUrl(account.user.avatarImageName)
});

export const getLastErrors = ({ account }) => account.lastErrors;
