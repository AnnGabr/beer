import React, {Component} from 'react';
import {SearchableList} from '../../containers';
import { MAIN_CONTENT } from '../../constants';

export default class Landing extends Component {
    render() {
        return (
            <main role={MAIN_CONTENT} className="layout has-scroll">
                <SearchableList />
            </main>      
        )    
    }
}