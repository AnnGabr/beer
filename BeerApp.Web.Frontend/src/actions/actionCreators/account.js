import { actionTypes } from '../actionTypes';
import createAction from './actionCreator';

import accountService from '../../services/accountService';
import validator from '../../utils/validator';

export const signIn = userCredentials => (dispatch) => {
    dispatch(createAction(actionTypes.SIGN_IN_REQUESTED));

    return accountService.signIn(userCredentials)
        .then((userProfile) => {
            dispatch(createAction(
                actionTypes.SIGN_IN_SUCCEEDED,
                userProfile
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
        .then(() => {
            dispatch(createAction(actionTypes.SIGN_OUT));
        })
        .catch((error) => {
            console.log(error.reasons || error.message);
        });

export const updateProfileInfo = newProfileInfo => dispatch => {
    const errors = validator.validateProfileInfo(newProfileInfo);
    if (errors) {
        dispatch(createAction(
            actionTypes.UPDATE_PROFILE_FAILED,
            errors
        ));
        return;
    }

    return accountService.updateProfileInfo(newProfileInfo)
        .then((userProfile) => {
            dispatch(createAction(
                actionTypes.UPDATE_PROFILE_SUCCEEDED,
                userProfile
            ));
        })
        .catch((error) => {
            dispatch(createAction(
                actionTypes.UPDATE_PROFILE_FAILED,
                error.reasons
            ));
        });
}

export const clearErrors = () => dispatch =>
    dispatch(createAction(actionTypes.CLEAR_ERRORS));
