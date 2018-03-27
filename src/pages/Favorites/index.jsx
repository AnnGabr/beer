import React from 'react';

import { PagedBeerList } from '../../containers';

const Favorites = ({ match }) => (
    <main className="layout has-scroll">
        <PagedBeerList activePageNumber={parseInt(match.params.pageNumber, 10)}/>
    </main>
);

export default Favorites;
