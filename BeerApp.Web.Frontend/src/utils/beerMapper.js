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

const map = (response, mapToModel) => {
    let mapResult = null;
    if (Array.isArray(response)) {
        mapResult = response.map(beer => mapToModel(beer));
    } else {
        mapResult = mapToModel(response);
    }

    return mapResult;
};

export default {
    mapToLandingModels,
    mapToFavoritesModels,
    mapToDetailsModels
};
