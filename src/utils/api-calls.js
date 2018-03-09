const API_URL = 'https://api.punkapi.com/v2/beers';

export function sendHttpGetBeerById(id) {
    sendHttpRequest(API_URL + `/${id}`);
}

export function sendHttpGetBeers() {
    sendHttpRequest(API_URL, retriveIdNameImgTagline);   
}

export function sendHttpGetBeersByName(name) {
    sendHttpRequest(API_URL + `?name=${name}`, retriveIdNameImgTagline);
}

function sendHttpRequest(url, onSuccess, onFail) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();

    xhr.onreadystatechange = () => { 
        if (xhr.readyState !== 4) return;
        if (xhr.status === 200 && onSuccess) {
            onSuccess(xhr.responseText);
        } else if(onFail) {
            onFail(xhr.statusText);      
        }
    }
}

function retriveIdNameImgTagline(serverResponse){
    serverResponse = JSON.parse(serverResponse);
    if(Array.isArray(serverResponse)){
        let beers = serverResponse.map((beer) => ({
            id: beer.id,
            image_url: beer.image_url,
            name: beer.name,
            tagline: beer.tagline
        }));
        console.log(beers);
    }
}

