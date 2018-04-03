import * as api from '../api/fetchApi';

const ROOT_URL = 'https://api.punkapi.com/v2/beers';

function getBeersByIds(ids) {
    const url = `${ROOT_URL}?${getBeerIdsUrlPart(ids)}`;
    return api.fetch(url);
}

function searchBeers(urlParams) {
    const url = buildSearchUrl(urlParams);
    return api.fetch(url);
}

const buildSearchUrl = ({
    pageNumber,
    beersPerPageCount,
    beerName,
    alcoholVolume,
    internationalBitternessUnits,
    colorEbc
}) => {
    const urlParts = [];
    if (pageNumber) {
        urlParts.push(getPageNumberUrlPart(pageNumber));
    }
    if (beersPerPageCount) {
        urlParts.push(getBeersPerPageCountUrlPart(beersPerPageCount));
    }
    if (beerName) {
        urlParts.push(getBeerNameUrlPart(beerName));
    }
    if (alcoholVolume) {
        urlParts.push(getAlcoholVolumeUrlPart(alcoholVolume));
    }
    if (internationalBitternessUnits) {
        urlParts.push(getInternationalBitternessUnitsUrlPart(internationalBitternessUnits));
    }
    if (colorEbc) {
        urlParts.push(getColorEbcUrlPart(colorEbc));
    }

    let url = ROOT_URL;
    if (urlParts.length !== 0) {
        url += `?${urlParts.join('&')}`;
    }

    return url;
};

const getBeersPerPageCountUrlPart = beersPerPageCount => `per_page=${beersPerPageCount}`;

const getPageNumberUrlPart = pageNumber => `page=${pageNumber}`;

const getBeerIdsUrlPart = beerIds => `ids=${beerIds.join('|')}`;

const getBeerNameUrlPart = beerName => `beer_name=${beerName.trim().replace(/\s+/gi, '_')}`;

const getAlcoholVolumeUrlPart = alcoholVolume => `abv_lt=${alcoholVolume}`;

const getInternationalBitternessUnitsUrlPart = internationalBitternessUnits =>
    `ibu_lt=${internationalBitternessUnits}`;

const getColorEbcUrlPart = colorEbc => `ebc_lt=${colorEbc}`;

export default {
    searchBeers,
    getBeersByIds
};
