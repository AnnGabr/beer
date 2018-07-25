import React from 'react';

import { PagedBeerList } from '../../containers';
import FavoriteBeer from '../../containers/beerItem/FavoriteBeer';

const Favorites = () => (
    <main className="layout has-scroll">
        <PagedBeerList BeerItem={FavoriteBeer}/>
    </main>
);

export default Favorites;
