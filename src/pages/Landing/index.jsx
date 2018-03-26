import React from 'react';

import { LandingSearchPanel, LandingBeerList } from '../../containers';

import { MAIN_CONTENT } from '../../constants';

const Landing = (props) =>  (
    <main id={MAIN_CONTENT} className="layout has-scroll">
        <section className="section container">
            <LandingSearchPanel />
            <LandingBeerList scrollableComponent={MAIN_CONTENT}/>
        </section>
    </main>      
);

export default Landing;