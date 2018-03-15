import React from 'react';
import {SearchableList} from '../../containers';
import { MAIN_CONTENT } from '../../constants';

const Landing = (props) =>  (
    <main role={MAIN_CONTENT} className="layout has-scroll">
        <SearchableList />
    </main>      
);

export default Landing;