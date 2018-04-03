const mapToLandingModels = (serverResponse, favorites) =>
    map(serverResponse, favorites, mapToLandingModel);

const mapToLandingModel = (beer, favorites) => ({
    ...getMainInfo(beer, favorites)
});

const mapToFavoritesModels = (serverResponse, favorites) =>
    map(serverResponse, favorites, mapToFavoritesModel);

const mapToFavoritesModel = (beer, favorites) => ({
    ...getMainInfo(beer, favorites),
    description: beer.description
});

const mapToDetailsModels = (serverResponse, favorites) =>
    map(serverResponse, favorites, mapToDetailsModel);

const mapToDetailsModel = (beer, favorites) => ({
    ...getMainInfo(beer, favorites),
    alcoholVolume: beer.abv,
    internationalBitternessUnits: beer.ibu,
    colorEbc: beer.ebc,
    foodPairing: beer.food_pairing,
    brewersTips: beer.brewers_tips,
    ingredients: beer.ingredients && {
        ...beer.ingredients,
        water: beer.boil_volume
    },
    method: beer.method && {
        fermentation: beer.method.fermentation,
        twist: beer.method.twist,
        mash: beer.method.mash_temp
    }
});

const map = (serverResponse, favorites, mapToModel) => {
    let beers = [];
    try {
        const parsedResponse = JSON.parse(serverResponse);
        if (Array.isArray(parsedResponse)) {
            beers = parsedResponse.map(beer => mapToModel(beer, favorites));
        }
    } catch (err) {
        console.log(`Can not parse server response: ${serverResponse}.`);
    }
    return beers;
};

const getMainInfo = (beer, favorites) => ({
    id: beer.id,
    imageUrl: beer.image_url,
    name: beer.name,
    tagline: beer.tagline,
    isFavorite: favorites.includes(beer.id),
});

export default {
    mapToLandingModels,
    mapToFavoritesModels,
    mapToDetailsModels
};
