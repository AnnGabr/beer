export function mapToLandingModels(serverResponse, favorites) {
    let beers = [];
    try {
        const parsedResponse = JSON.parse(serverResponse);
        if (Array.isArray(parsedResponse)) {
            beers = parsedResponse.map(beer => ({
                ...getMainInfo(beer, favorites),
            }));
        }
    } catch (err) {
        console.log('Can not parse server response at: mapToLandingModels.');
    }
    return beers;
}

export function mapToFavoritesModels(serverResponse, favorites) {
    let beers = [];
    try {
        const parsedResponse = JSON.parse(serverResponse);
        if (Array.isArray(parsedResponse)) {
            beers = parsedResponse.map(beer => ({
                ...getMainInfo(beer, favorites),
                description: beer.description,
            }));
        }
    } catch (err) {
        console.log('Can not parse server response at: mapToFavoritesModels.');
    }

    return beers;
}

const getMainInfo = (beer, favoriteBeersIds) => ({
    id: beer.id,
    imageUrl: beer.image_url,
    name: beer.name,
    tagline: beer.tagline,
    isFavorite: favoriteBeersIds.includes(beer.id),
});

export function mapToDetailsModels(serverResponse, favorites) {
    let beers = [];
    try {
        const parsedResponse = JSON.parse(serverResponse);
        if (Array.isArray(parsedResponse)) {
            beers = parsedResponse.map(beer => mapToDetailsModel(beer, favorites));
        }
    } catch (err) {
        console.log('Can not parse server response at: mapToDetailsModels.');
    }

    return beers;
}

const mapToDetailsModel = (beer, favoriteBeersIds) => ({
    mainInfo: {
        ...getMainInfo(beer, favoriteBeersIds),
        description: beer.description
    },
    properties: {
        internationalBitternessUnits: beer.ibu,
        colorEbc: beer.ebc,
        alcoholVolume: beer.abv
    },
    method: beer.method && {
        twist: beer.twist,
        fermentation: beer.fermentation,
        mashTemp: beer.method.mash_temp
    },
    ingredients: beer.ingredients && {
        ...beer.ingredients,
        water: beer.boil_volume
    },
    foodPairing: beer.food_pairing,
    brewersTips: beer.brewers_tips
});

