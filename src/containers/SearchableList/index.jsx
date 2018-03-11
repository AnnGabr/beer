import React, {Component} from 'react';

import {Searchbar, Filter} from '../../components';
import VisibleBeerList from '../VisibleBeerList';

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
            <section className="section container">
                <Searchbar onSearch={this.toggleFilter}/>
                <Filter isOpened={this.state.isFilterOpened}/>
                <VisibleBeerList />
            </section>
        )
    }
}