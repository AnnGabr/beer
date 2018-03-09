import React, {Component} from 'react';

import {Searchbar, Filter} from '../../components';
import BeerList from '../BeerList';
import { sendHttpGetBeers } from '../../utils/api-calls';

export default class SearchableList extends Component {
    constructor(props) {
        super(props);
        this.state = {isFilterOpened: false};

        this.toggleFilter = this.toggleFilter.bind(this);
        sendHttpGetBeers();
    }
    
    toggleFilter(){
        this.setState({isFilterOpened: !this.state.isFilterOpened});
    }

    render() {
        return (
            <main className="section container">
                <Searchbar onSearch={this.toggleFilter}/>
                <Filter isOpened={this.state.isFilterOpened}/>
                <BeerList beers={beers}/>
            </main>
        )
    }
}

const beers = [{
    name: "First",
    image_url: "https://images.punkapi.com/v2/192.png",
    tagline: "tweet",
    id: 0
},
{
    name: "First",
    image_url: "https://images.punkapi.com/v2/192.png",
    tagline: "tweet",
    id: 1
}
,
{
    name: "First",
    image_url: "https://images.punkapi.com/v2/192.png",
    tagline: "tweet",
    id: 2
}
,
{
    name: "First",
    image_url: "https://images.punkapi.com/v2/192.png",
    tagline: "tweet",
    id: 3
}
,
{
    name: "First",
    image_url: "https://images.punkapi.com/v2/192.png",
    tagline: "tweet",
    id: 4
}];