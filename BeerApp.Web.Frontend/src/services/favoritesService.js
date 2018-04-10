import localStorageService from './localStorageService';

const FAVORITES_KEY = 'favorites';

function set(beerIds) {
    localStorageService.setItem(FAVORITES_KEY, {
        beerIds,
    });
}

function get() {
    const favorites = localStorageService.getItem(FAVORITES_KEY);
    return favorites;
}

export default {
    set,
    get
};
