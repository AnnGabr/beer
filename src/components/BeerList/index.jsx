import React from 'react';

import BeerItem from '../BeerItem';

const BeerList = ({beers}) => (
    <ul className="columns is-multiline beer-list">
        {beers.map((beer) => (
            <li key={beer.id} className="column is-one-third">
                <BeerItem {...beer} />
            </li>
        ))}
    </ul>
)

export default BeerList;