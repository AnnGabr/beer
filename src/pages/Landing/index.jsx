import React from 'react';

import SearchPanel from '../../containers/LandingSearchPanel';
import InfiniteBeerList from '../../containers/LandingBeerList';

import { MAIN_CONTENT } from '../../constants';

const Landing = () =>  (
    <main id={MAIN_CONTENT} className="layout has-scroll">
        <section className="section container">
            <SearchPanel />
            <InfiniteBeerList scrollableComponent={MAIN_CONTENT}/>
        </section>
    </main>      
);

export default Landing;