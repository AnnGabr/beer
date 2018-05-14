import { actionTypes } from '../actionTypes';
import createAction from './actionCreator';

import accountService from '../../services/accountService';
import mapper from '../../utils/userMapper';

const signIn = userCredentials => (dispatch) => {
    dispatch(createAction(actionTypes.LOGIN_REQUESTED));

    return accountService
        .signIn(userCredentials)
        .then((userProfileInfo) => {
            dispatch(createAction(
                actionTypes.FAVORITE_BEERS_FETCH_SUCCEEDED,
                userProfileInfo
            ));
        })
        .catch((error) => {
            dispatch(createAction(
                actionTypes.FAVORITE_BEERS_FETCH_FAILED,
                error.validationError
            ));
        });
};

export default signIn;
