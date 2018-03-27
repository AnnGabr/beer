import localStorageService from './localStorageService';

const FAVORITES_KEY = 'favorites';

const favoritesService = {
    set(beerIds) {
        localStorageService.setItem(FAVORITES_KEY, {
            beerIds,
        });
    },

    get() {
        const favorites = localStorageService.getItem(FAVORITES_KEY);
        return favorites;
    },
};

export default favoritesService;
