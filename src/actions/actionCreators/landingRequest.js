import {actionTypes} from '../actionTypes';

export const setRequest = (request) => ({
    type: actionTypes.SET_LANDING_REQUEST,
    payload: request
});