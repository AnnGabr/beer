export const actionTypes = {
    FETCH_FAVORITE_BEER_IDS: 'FETCH_FAVORITE_BEER_IDS',
    FAVORITE_BEER_IDS_FETCH_SUCCEEDED: 'FAVORITE_BEER_IDS_FETCH_SUCCEEDED',
    FAVORITE_BEER_IDS_FETCH_FAILED: 'FAVORITE_BEER_IDS_FETCH_FAILED',

    FETCH_FAVORITE_BEER_PAGE: 'FETCH_FAVORITE_BEER_PAGE',
    FAVORITE_BEER_PAGE_FETCH_SUCCEEDED: 'FAVORITE_BEER_PAGE_FETCH_SUCCEEDED',
    FAVORITE_BEER_PAGE_FETCH_FAILED: 'FAVORITE_BEER_PAGE_FETCH_FAILED',
    RESET_FAVORITES_RELOADINGS: 'RESET_FAVORITES_RELOADINGS',

    SEARCH_STARTED: 'SEARCH_STARTED',
    FETCH_LANDING_BEERS: 'FETCH_LANDING_BEERS',
    LANDING_BEERS_FETCH_SUCCEEDED: 'LANDING_BEERS_FETCH_SUCCEEDED',
    LANDING_BEERS_FETCH_FAILED: 'LANDING_BEERS_FETCH_FAILED',

    FAVORITES_CHANGED: 'FAVORITES_CHANGED',
    LANDING: {
        FAVORITE_ADDED: 'LANDING.FAVORITE_ADDED',
        FAVORITE_REMOVED: 'LANDING.FAVORITE_REMOVED',
        REQUEST_FAVORITE_CHANGE: 'LANDING.REQUEST_FAVORITE_CHANGE'
    },
    FAVORITES: {
        FAVORITE_REMOVED: 'FAVORITES.FAVORITE_REMOVED',
        REQUEST_FAVORITE_CHANGE: 'FAVORITES.REQUEST_FAVORITE_CHANGE'
    },

    SIGN_IN_REQUESTED: 'SIGN_IN_REQUESTED',
    SIGN_IN_SUCCEEDED: 'SIGN_IN_SUCCEEDED',
    SIGN_IN_FAILED: 'SIGN_IN_FAILED',

    SIGN_OUT: 'SIGN_OUT',

    UPDATE_PROFILE_REQUESTED: 'UPDATE_PROFILE_SUCCEEDED',
    UPDATE_PROFILE_SUCCEEDED: 'UPDATE_PROFILE_SUCCEEDED',
    UPDATE_PROFILE_FAILED: 'UPDATE_PROFILE_FAILED',

    CLEAR_ERRORS: 'CLEAR_ERRORS'
};
