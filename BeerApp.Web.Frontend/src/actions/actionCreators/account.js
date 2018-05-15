import { actionTypes } from '../actionTypes';
import createAction from './actionCreator';

import accountService from '../../services/accountService';

export const signIn = userCredentials => (dispatch) => {
    dispatch(createAction(actionTypes.SIGN_IN_REQUESTED));

    return accountService.signIn(userCredentials)
        .then((userProfileInfo) => {
            dispatch(createAction(
                actionTypes.SIGN_IN_SUCCEEDED,
                userProfileInfo
            ));
        })
        .catch((error) => {
            dispatch(createAction(
                actionTypes.SIGN_IN_FAILED,
                error.reasons
            ));
        });
};

export const signOut = () => (dispatch) => {
    dispatch(createAction(actionTypes.SIGN_OUT_REQUESTED));

    return accountService.signOut()
        .catch((error) => {
            console.log(error.reasons || error.message);
        });
};

export const clearErrors = () => (dispatch) => {
    dispatch(createAction(actionTypes.CLEAR_ERRORS));
};
