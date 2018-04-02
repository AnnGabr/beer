import React from 'react';

import { BeerDetails } from '../containers';
import { Message } from '../components';

import '../components/common/styles/advertising.css';

const Details = () => (
    <main className="layout has-scroll columns is-centered">
        <section className="section column is-8">
            <BeerDetails />
        </section>
        <section className="section column advertising is-3">
            <Message text="advertising" />
        </section>
    </main>
);

export default Details;
