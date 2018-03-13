import {actionTypes} from '../actionTypes';

export const setRequest = (request) => ({
    type: actionTypes.SET_REQUEST,
    payload: request
});