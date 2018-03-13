import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Searchbar, Filter} from '../../components';
import InfiniteBeerList from '../InfiniteBeerList';

import {fetchBeers, resetBeers} from '../../actions/actionCreators/beerList';
import { SEARCH_FAIL_MESSAGE } from '../../constants';

const mapStateToProps = state => ({
    ...state.beerList
});

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
        const searchReault = (
            <InfiniteBeerList 
                loading={this.props.loading}
                beers={this.props.beers}
            />
        );
        
        if(this.props.error) {
            return (
                <div className="beer-list">
                    <div className="title">
                        {SEARCH_FAIL_MESSAGE}
                    </div>
                </div>
            )
        }

        return (
            <section className="section container">
                <Searchbar onSearch={this.handleSearch}/>
                <Filter isOpened={this.state.isFilterOpened}/>
                {searchReault}
            </section>
        )
    }
}

SearchableList = connect(mapStateToProps, { fetchBeers, resetBeers })(SearchableList);

export default SearchableList;