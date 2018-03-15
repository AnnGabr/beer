import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Searchbar, Filter} from '../../components';
import InfiniteBeerList from '../InfiniteBeerList';

import {fetchBeers, resetBeers} from '../../actions/actionCreators/beerList';
import {SEARCH_FAIL_MESSAGE, FETCH_FAIL_MESSAGE} from '../../constants';
import {retrieveMain} from '../../utils/beers-filters';

const mapStateToProps = state => ({
    ...state.beerList
});

class SearchableList extends Component {
    constructor(props) {
        super(props);
        this.state = {isFilterOpened: false};
    }

    handleSearch = () => {
        this.props.resetBeers();
        this.props.fetchBeers(retrieveMain);
        if(!this.state.isFilterOpened) {
            this.setState({isFilterOpened: true});
        }      
    }

    render() {
        let searchReasult = (
            <InfiniteBeerList 
                loading={this.props.loading}
                beers={this.props.beers}
            />
        );
        if(this.props.error) {
            searchReasult = (
                <div className="beer-list">
                    <div className="title">
                        {FETCH_FAIL_MESSAGE}
                    </div>
                </div>
            );
        } else if(this.props.isAllFetched) {
            if(this.props.beers.length === 0) {
                searchReasult = (
                    <div className="beer-list">
                        <div className="title">
                            {SEARCH_FAIL_MESSAGE}
                        </div>
                    </div>
                );
            }
        }

        return (
            <section className="section container">
                <Searchbar onSearch={this.handleSearch}/>
                {this.state.isFilterOpened && <Filter />}
                {searchReasult}
            </section>
        )
    }
}

SearchableList = connect(mapStateToProps, { fetchBeers, resetBeers })(SearchableList);

export default SearchableList;