export function mapToLandingModels(serverResponse) {
    let beers = [];
    try {
        const parsedResponse = JSON.parse(serverResponse);
        if (Array.isArray(parsedResponse)) {
            beers = parsedResponse.map(beer => ({
                ...getMainInfo(beer),
            }));
        }
    } catch (err) {
        console.log('Can not parse server response at: mapToLandingModels.');
    }
    return beers;
}

export function mapToFavoritesModels(serverResponse) {
    let beers = [];
    try {
        const parsedResponse = JSON.parse(serverResponse);
        if (Array.isArray(parsedResponse)) {
            beers = parsedResponse.map(beer => ({
                ...getMainInfo(beer),
                description: beer.description,
            }));
        }
    } catch (err) {
        console.log('Can not parse server response at: mapToFavoritesModels.');
    }

    return beers;
}

const getMainInfo = beer => ({
    id: beer.id,
    imageUrl: beer.image_url,
    name: beer.name,
    tagline: beer.tagline
});

export function mapToDetailsModels(serverResponse) {
    let beers = [];
    try {
        const parsedResponse = JSON.parse(serverResponse);
        if (Array.isArray(parsedResponse)) {
            beers = parsedResponse.map(beer => mapToDetailsModel(beer));
        }
    } catch (err) {
        console.log('Can not parse server response at: mapToDetailsModels.');
    }

    return beers;
}

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

