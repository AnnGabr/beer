const mapToLandingModels = serverResponse =>
    map(serverResponse, mapToLandingModel);

const mapToLandingModel = beer => ({
    ...getMainInfo(beer)
});

const mapToFavoritesModels = serverResponse =>
    map(serverResponse, mapToFavoritesModel);

const mapToFavoritesModel = beer => ({
    ...getMainInfo(beer),
    description: beer.description
});

const mapToDetailsModels = serverResponse =>
    map(serverResponse, mapToDetailsModel);

const mapToDetailsModel = beer => ({
    mainInfo: {
        ...getMainInfo(beer),
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

const getMainInfo = beer => ({
    id: beer.id,
    imageUrl: beer.image_url,
    name: beer.name,
    tagline: beer.tagline
});

const map = (serverResponse, mapToModel) => {
    let beers = [];
    try {
        const parsedResponse = JSON.parse(serverResponse);
        if (Array.isArray(parsedResponse)) {
            beers = parsedResponse.map(beer => mapToModel(beer));
        }
    } catch (err) {
        console.log(`Can not parse server response: ${serverResponse}.`);
    }
    return beers;
};

export default {
    mapToLandingModels,
    mapToFavoritesModels,
    mapToDetailsModels
};
