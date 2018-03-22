const ROOT_URL = 'https://api.punkapi.com/v2/beers';

export const urlParamsNames = {
    pageNumber: 'pageNumber',
    beersPerPage: 'beersPerPage',
    beerName: 'beerName',
    alcoholVolume: 'alcoholVolume',
    internationalBitternessUnits: 'internationalBitternessUnits',
    colorEbc: 'colorEbc',
    beerIds: 'beerIds'
}

const getBeersPerPageCountUrlPart = (beersPerPageCount) => `per_page=${beersPerPageCount}`;

const getPageNumberUrlPart = (pageNumber) => `page=${pageNumber}`;

const getBeerIdsUrlPart = (beerIds) => 'ids=' + beerIds.join('|');

const getBeerNameUrlPart = (beerName) => 'beer_name=' + beerName.trim().replace(/\s+/ig, '_');

const getAlcoholVolumeUrlPart = (alcoholVolume) => `abv_lt=${alcoholVolume}`;

const getInternationalBitternessUnitsUrlPart = (internationalBitternessUnits) => (
    `ibu_lt=${internationalBitternessUnits}`
);

const getColorEbcUrlPart = (colorEbc) => `ebc_lt=${colorEbc}`;

export const buildUrl = (urlParams) => {
    let urlParts = [];
    if(urlParams.pageNumber) {
        urlParts.push(getPageNumberUrlPart(urlParams.pageNumber));
    }
    if(urlParams.beersPerPageCount) {
        urlParts.push(getBeersPerPageCountUrlPart(urlParams.beersPerPageCount));
    }
    if(urlParams.beerName) {
        urlParts.push(getBeerNameUrlPart(urlParams.beerName));
    }
    if(urlParams.alcoholVolume) {
        urlParts.push(getAlcoholVolumeUrlPart(urlParams.alcoholVolume));
    }
    if(urlParams.internationalBitternessUnits) {
        urlParts.push(getInternationalBitternessUnitsUrlPart(urlParams.internationalBitternessUnits)); 
    }
    if(urlParams.colorEbc) {
        urlParts.push(getColorEbcUrlPart(urlParams.colorEbc));
    }
    if(urlParams.beerIds) {
        urlParts.push(getBeerIdsUrlPart(urlParams.beerIds));
    }
    
    let url = ROOT_URL;
    if(urlParts.length !== 0) {
        url += '?' + urlParts.join('&');
    }

    return url;
}