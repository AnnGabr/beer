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
    properties: beer.properties && {
        alcoholVolume: beer.properties.abv,
        internationalBitternessUnits: beer.properties.ibu,
        colorEbc: beer.properties.ebc
    },
    method: beer.method,
    ingredients: beer.ingredients,
    foodPairing: beer.foodPairing,
    brewersTips: beer.brewersTips
});

const getMainInfo = beer => ({
    id: beer.punkId,
    apiId: beer.Id,
    imageUrl: beer.imageUrl,
    name: beer.beerName,
    tagline: beer.tagline
});

const map = (serverResponse, mapToModel) => {
    let mapResult = null;
    try {
        const parsedResponse = JSON.parse(serverResponse);
        if (Array.isArray(parsedResponse)) {
            mapResult = parsedResponse.map(beer => mapToModel(beer));
        } else {
            mapResult = mapToModel(parsedResponse);
        }
    } catch (err) {
        console.log(`Can not parse server response: ${serverResponse}.`);
    }

    return mapResult;
};

export default {
    mapToLandingModels,
    mapToFavoritesModels,
    mapToDetailsModels
};
