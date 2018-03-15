export function retrieveMain(serverResponse, favorites){
    let beers = [];
    try{
        serverResponse = JSON.parse(serverResponse);
        if(Array.isArray(serverResponse)){
            beers = serverResponse.map((beer) => ({
                id: beer.id,
                image_url: beer.image_url,
                name: beer.name,
                tagline: beer.tagline,
                isFavorite: favorites.includes(beer.id)
            }));
        }
    } catch(err){
        console.log(`Can not parse server response at: retriveMain.`);
    }
    return beers;
}

export function retrieveExpanded(serverResponse, favorites){
    let beers = [];
    try{
        serverResponse = JSON.parse(serverResponse);
        if(Array.isArray(serverResponse)){
            beers = serverResponse.map((beer) => ({
                id: beer.id,
                image_url: beer.image_url,
                name: beer.name,
                tagline: beer.tagline,
                description: beer.description,
                isFavorite: favorites.includes(beer.id)
            }));
        }
    } catch(err){
        console.log(`Can not parse server response at: retriveExpanded.`);
    }
    return beers;
}

export function retrieveAll(serverResponse, favorites){
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