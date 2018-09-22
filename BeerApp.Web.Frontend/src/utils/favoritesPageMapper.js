import beerMapper from './beerMapper';

const mapToFavoritesPage = favoritesPage => ({
    pageNumber: favoritesPage.page,
    pagesCount: favoritesPage.pagesCount,
    beers: beerMapper.mapToFavoritesModels(favoritesPage.beers)
});

export default {
    mapToFavoritesPage
};
