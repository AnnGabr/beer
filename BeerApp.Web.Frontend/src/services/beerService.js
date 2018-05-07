import * as api from '../api/fetchApi';

const BEER_ROOT_URL = 'beer';
const FAVORITES_ROOT_URL = 'favorites';

function getBeersByIds(ids) {
    const url = `${FAVORITES_ROOT_URL}?${getBeerIdsUrlPart(ids)}`;
    return api.get(url);
}

function searchBeers(urlParams) {
    const url = buildSearchQuery(urlParams);
    return api.get(url);
}

const buildSearchQuery = ({
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

    let url = BEER_ROOT_URL;
    if (urlParts.length !== 0) {
        url += `?${urlParts.join('&')}`;
    }

    return url;
};

const getBeersPerPageCountUrlPart = beersPerPageCount => `perPage=${beersPerPageCount}`;

const getPageNumberUrlPart = pageNumber => `page=${pageNumber}`;

const getBeerIdsUrlPart = beerIds => `ids=${beerIds.join('|')}`;

const getBeerNameUrlPart = beerName => `beerName=${beerName.trim().replace(/\s+/gi, '_')}`;

const getAlcoholVolumeUrlPart = alcoholVolume => `abv=${alcoholVolume}`;

const getInternationalBitternessUnitsUrlPart = internationalBitternessUnits =>
    `ibu=${internationalBitternessUnits}`;

const getColorEbcUrlPart = colorEbc => `ebc=${colorEbc}`;

export default {
    searchBeers,
    getBeersByIds
};
