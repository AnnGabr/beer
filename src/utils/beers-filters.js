export function mapToLandingModels(serverResponse, favorites){
    let beers = [];
    try{
        serverResponse = JSON.parse(serverResponse);
        if(Array.isArray(serverResponse)){
            beers = serverResponse.map((beer) => ({
                ...getMainInfo(beer, favorites)
            }));
        }
    } catch(err){
        console.log(`Can not parse server response at: retriveMain.`);
    }
    return beers;
}

export function mapToFavoritesModels(serverResponse, favorites){
    let beers = [];
    try{
        serverResponse = JSON.parse(serverResponse);
        if(Array.isArray(serverResponse)){
            beers = serverResponse.map((beer) => ({
                ...getMainInfo(beer, favorites),
                description: beer.description
            }));
        }
    } catch(err){
        console.log(`Can not parse server response at: retriveExpanded.`);
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
        serverResponse = JSON.parse(serverResponse);
        if(Array.isArray(serverResponse)){
            beers = serverResponse.map((beer) => ({
                ...serverResponse,
                isFavorite: favorites.includes(beer.id)
            }));
        }
    } catch(err){
        console.log(`Can not parse server response at: retriveAll.`);
    }
    return beers;
}