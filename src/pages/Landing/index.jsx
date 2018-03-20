import React from 'react';

import { SearchableBeerList } from '../../containers';

import { MAIN_CONTENT } from '../../constants';

const Landing = (props) =>  (
    <main id={MAIN_CONTENT} className="layout has-scroll">
        <SearchableBeerList scrollableComponent={MAIN_CONTENT}/>
    </main>      
);

export default Landing;