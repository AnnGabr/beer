const ROOT_URL = 'https://api.punkapi.com/v2/beers';

export function sendHttpGetBeerById(id) {
    sendHttpRequest(ROOT_URL
     + `/${id}`);
}

export function sendHttpGetBeers(page, count, onSuccess, onFail) {
    let url = ROOT_URL + `?page=${page}&per_page=${count}`;

    sendHttpRequest(url, onSuccess, onFail, retriveIdNameImgTagline);   
}

export function sendHttpGetBeersByName(name) {
    sendHttpRequest(ROOT_URL
     + `?name=${name}`, retriveIdNameImgTagline);
}

function sendHttpRequest(url, onSuccess, onFail, parse) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();

    xhr.onreadystatechange = () => { 
        if (xhr.readyState !== 4) return;
        if (xhr.status === 200 && onSuccess) {
            onSuccess(parse(xhr.responseText));
        } else if(onFail) {
            onFail(xhr.statusText);      
        }
    }
}

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
    console.log(beers);
    
    return beers;
}

