function retriveIdNameImgTagline(serverResponse){
    serverResponse = JSON.parse(serverResponse);
    let beers = [];
    if(Array.isArray(serverResponse)){
        beers = serverResponse.map((beer) => ({
            id: beer.id,
            image_url: beer.image_url,
            name: beer.name,
            tagline: beer.tagline
        }));
    }
    
    return beers;
}