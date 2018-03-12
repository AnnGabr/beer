export function retriveIdNameImgTagline(serverResponse){
    let beers = [];
    try{
        serverResponse = JSON.parse(serverResponse);
        if(Array.isArray(serverResponse)){
            beers = serverResponse.map((beer) => ({
                id: beer.id,
                image_url: beer.image_url,
                name: beer.name,
                tagline: beer.tagline
            }));
        }
    } catch(err){
        console.log(`Can not parse server response at: ${retriveIdNameImgTagline}.`);
    }
    
    return beers;
}