import { actionTypes } from '../actionTypes';
import createAction from './actionCreator';

import accountService from '../../services/accountService';

export const signIn = userCredentials => (dispatch, getState) => {
    dispatch(createAction(actionTypes.SIGN_IN_REQUESTED));

    return accountService.signIn(userCredentials)
        .then((userProfileInfo) => {
            //goBack here
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

export const signOut = () => dispatch =>
    accountService.signOut()
        .catch((error) => {
            console.log(error.reasons || error.message);
        })
        .then(() => {
            dispatch(createAction(actionTypes.SIGN_OUT));
        });

export const clearErrors = () => dispatch =>
    dispatch(createAction(actionTypes.CLEAR_ERRORS));
