import {actionTypes} from '../actionTypes';

export const setRequest = (request) => ({
    type: actionTypes.SET_FAVORITES_REQUEST,
    payload: request
});