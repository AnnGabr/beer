const mapToLandingModels = serverResponse =>
    map(serverResponse, mapToLandingModel);

const mapToLandingModel = beer => ({
    ...getMainInfo(beer),
    ...defaultStateProps
});

const mapToFavoritesModels = serverResponse =>
    map(serverResponse, mapToFavoritesModel);

const mapToFavoritesModel = beer => ({
    ...getMainInfo(beer),
    ...defaultStateProps,
    description: beer.description
});

const mapToDetailsModels = serverResponse =>
    map(serverResponse, mapToDetailsModel);

const mapToDetailsModel = beer => ({
    mainInfo: {
        ...getMainInfo(beer),
        ...defaultStateProps,
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
    punkId: beer.punkId,
    id: beer.id,
    imageUrl: beer.imageUrl,
    name: beer.beerName,
    tagline: beer.tagline
});

const defaultStateProps = {
    loading: false,
    error: null
};

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
