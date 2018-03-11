import React, {Component} from 'react';
import {SearchableList} from '../../containers';

export default class Landing extends Component {
    render() {
        return (
            <main className="layout has-scroll">
                <SearchableList />
            </main>      
        )    
    }
}