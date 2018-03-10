import React, {Component} from 'react';

import {Searchbar, Filter} from '../../components';
import BeerList from '../BeerList';

export default class SearchableList extends Component {
    constructor(props) {
        super(props);
        this.state = {isFilterOpened: false};

        this.toggleFilter = this.toggleFilter.bind(this);
    }
    
    toggleFilter(){
        this.setState({isFilterOpened: !this.state.isFilterOpened});
    }

    render() {
        return (
            <main className="section container">
                <Searchbar onSearch={this.toggleFilter}/>
                <Filter isOpened={this.state.isFilterOpened}/>
                <BeerList />
            </main>
        )
    }
}