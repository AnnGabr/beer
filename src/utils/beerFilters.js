export function mapToLandingModels(serverResponse, favorites){
    let beers = [];
    try{
        const parsedResponse = JSON.parse(serverResponse);
        if(Array.isArray(parsedResponse)){
            beers = parsedResponse.map((beer) => ({
                ...getMainInfo(beer, favorites)
            }));
        }
    } catch(err){
        console.log('Can not parse server response at: mapToLandingModels.');
    }
    return beers;
}

export function mapToFavoritesModels(serverResponse, favorites){
    let beers = [];
    try{
        const parsedResponse = JSON.parse(serverResponse);
        if(Array.isArray(parsedResponse)){
            beers = parsedResponse.map((beer) => ({
                ...getMainInfo(beer, favorites),
                description: beer.description
            }));
        }
    } catch(err){
        console.log('Can not parse server response at: mapToFavoritesModels.');
    }

    return beers;
}

const getMainInfo = (beer, favorites) => ({
    id: beer.id,
    image_url: beer.image_url,
    name: beer.name,
    tagline: beer.tagline,
    isFavorite: favorites.includes(beer.id)
});

export function mapToDetailsModels(serverResponse, favorites){
    let beers = [];
    try{
        const parsedResponse = JSON.parse(serverResponse);
        if(Array.isArray(parsedResponse)){
            beers = parsedResponse.map((beer) => ({
                ...parsedResponse,
                isFavorite: favorites.includes(beer.id)
            }));
        }
    } catch(err){
        console.log('Can not parse server response at: mapToDetailsModels.');
    }
    
    return beers;
}