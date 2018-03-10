import React, {Component} from 'react';
import {SearchableList} from '../../containers';

export default class Landing extends Component {
    render() {
        return (
            <div className="layout has-scroll">
                <SearchableList />
            </div>      
        )    
    }
}