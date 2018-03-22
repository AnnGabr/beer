export const requestTypes = {
    GET_BY_IDS: "GET_BY_IDS",
    GET_BY_NAME: "GET_BY_NAME"
}

const ROOT_URL = 'https://api.punkapi.com/v2/beers';

export const fetchBeers = (request) => {
    switch(request.type){
        case requestTypes.GET_BY_IDS:
            return fetchBeersByIds(request.urlParams);
        case requestTypes.GET_BY_NAME:
            return fetchBeersByName(request.urlParams);
        default:
            throw new Error(`Unknown request type: ${request.type}`);
    }   
}

const fetchBeersByIds = ({page, perPage, ids}) => {
    const idsUrlPart = ids.join('|');
    return fetchBeersByUrl(getUrlByPage(page, perPage) + `&ids=${idsUrlPart}`);
}

const fetchBeersByName = ({page, perPage, name, filter}) => {
    let beerInfoUrlPart = '';
    if(name) {
        beerInfoUrlPart += '&beer_name=' + name.trim().replace(/\s+/ig, '_');
    } 
    if(filter) {
        const { alcoholVolume, internationalBitternessUnits, colorEbc } = filter;
        beerInfoUrlPart += `&abv_lt=${alcoholVolume}&ibu_lt=${internationalBitternessUnits}&ebc_lt=${colorEbc}`;
    }
    return fetchBeersByUrl(getUrlByPage(page, perPage) + beerInfoUrlPart);
}

const getUrlByPage = (page, perPage) => ROOT_URL + `?page=${page}&per_page=${perPage}`;

const fetchBeersByUrl = (url) => new Promise ((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
        if (this.status === 200) {
            resolve(this.response);
        } else {
            let error = new Error(this.statusText);
            error.code = this.status;
            reject(error);
        }
    };

    xhr.onerror = function() {
        reject(new Error("Network Error"))
    };
    
    xhr.send();
});

