import { fetch } from '../fetchApi';
import { buildUrl } from './urlBuilder';

export const fetchBeers = (urlParams) => {
    const url = buildUrl(urlParams);
    return fetch(url);  
}

