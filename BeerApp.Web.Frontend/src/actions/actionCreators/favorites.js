import { actionTypes } from '../actionTypes';
import createAction from './actionCreator';

import favoritesService from '../../services/favoritesService';

export const changeFavorite = (id, isMarkedAsFavorite) => dispatch => {
    const makeRequest = isMarkedAsFavorite
        ? favoritesService.remove
        : favoritesService.add;

    return makeRequest(id)
        .then(() => {
            dispatch(createAction(
                actionTypes.FAVORITES_CHANGED,
                id
            ));
        });
};


