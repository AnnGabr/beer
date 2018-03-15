import React from 'react';

import { SearchableBeerList } from '../../containers';

import { MAIN_CONTENT } from '../../constants';

const Landing = (props) =>  (
    <main role={MAIN_CONTENT} className="layout has-scroll">
        <SearchableBeerList />
    </main>      
);

export default Landing;