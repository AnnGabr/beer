import { actionTypes } from '../actionTypes';

export const setRequest = (request) => {
    let fetchParams = {};
    if(request.filter) {
        fetchParams = {
            alcoholVolume: request.filter.alcoholVolume,
            internationalBitternessUnits: request.filter.internationalBitternessUnits,
            colorEbc: request.filter.colorEbc   
        }
    }
    fetchParams.beerName = request.beerName;

    return ({
        type: actionTypes.SET_LANDING_REQUEST,
        payload: fetchParams
    });
}

export const setDefaultRequest = () => ({
    type: actionTypes.SET_LANDING_DAFAULT_REQUEST,
});