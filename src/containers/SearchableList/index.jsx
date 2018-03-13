import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Searchbar, Filter} from '../../components';
import InfiniteBeerList from '../InfiniteBeerList';

import {fetchBeers, resetBeers} from '../../actions/actionCreators/beerList';

class SearchableList extends Component {
    constructor(props) {
        super(props);
        this.state = {isFilterOpened: false};
    }
    
    handleSearch = () => {
        if(!this.state.isFilterOpened) {
            this.setState({isFilterOpened: true});
        }      
        this.props.resetBeers();
        this.props.fetchBeers();
    }

    render() {
        return (
            <section className="section container">
                <Searchbar onSearch={this.handleSearch}/>
                <Filter isOpened={this.state.isFilterOpened}/>
                <InfiniteBeerList />
            </section>
        )
    }
}

SearchableList = connect(null, { fetchBeers, resetBeers })(SearchableList);

export default SearchableList;