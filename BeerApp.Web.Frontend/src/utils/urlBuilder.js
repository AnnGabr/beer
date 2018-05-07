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

    let url = '';
    if (urlParts.length !== 0) {
        url += `?${urlParts.join('&')}`;
    }

    return url;
};

const getBeersPerPageCountUrlPart = beersPerPageCount => `perPage=${beersPerPageCount}`;

const getPageNumberUrlPart = pageNumber => `page=${pageNumber}`;

const getBeerNameUrlPart = beerName => `beerName=${beerName.trim().replace(/\s+/gi, '_')}`;

const getAlcoholVolumeUrlPart = alcoholVolume => `abv=${alcoholVolume}`;

const getInternationalBitternessUnitsUrlPart = internationalBitternessUnits =>
    `ibu=${internationalBitternessUnits}`;

const getColorEbcUrlPart = colorEbc => `ebc=${colorEbc}`;

const getBeerIdsUrlPart = beerIds => `ids=${beerIds.join('|')}`;

export default {
    buildSearchQuery,
    getBeerIdsUrlPart
};
