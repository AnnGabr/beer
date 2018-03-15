import React from 'react';

import { PagedBeerList } from '../../containers';

const Favorites = (props) =>  (
    <main className="layout has-scroll">
        <PagedBeerList />
    </main>      
);

export default Favorites;