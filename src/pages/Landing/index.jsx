import React, {Component } from 'react';

import SearchPanel from '../../containers/LandingSearchPanel';
import InfiniteBeerList from '../../containers/LandingBeerList';

export default class Landing extends Component {
    render() {
        return (
            <main className="layout has-scroll">
                <section className="section container">
                    <SearchPanel />
                    <InfiniteBeerList scrollableComponent={this}/>
                </section>
            </main> 
        );
    }       
}