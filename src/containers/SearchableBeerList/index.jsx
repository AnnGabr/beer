import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Searchbar, Filter, Message} from '../../components';
import InfiniteBeerList from '../InfiniteBeerList';

import {fetchBeers, resetBeers} from '../../actions/actionCreators/beerList';
import {SEARCH_FAIL_MESSAGE, FETCH_FAIL_MESSAGE} from '../../constants';
import {retrieveMain} from '../../utils/beers-filters';

const mapStateToProps = state => ({
    ...state.beerList
});

class SearchableBeerList extends Component {
    constructor(props) {
        super(props);
        this.state = {isFilterOpened: false};
    }

    render() {
        return (
            <section className="section container">
                <Searchbar onSearch={this.handleSearch}/>
                {this.state.isFilterOpened && <Filter />}
                {this.getSearchResult()}
            </section>
        )
    }

    handleSearch = () => {
        this.props.resetBeers();
        this.props.fetchBeers(retrieveMain);
        if(!this.state.isFilterOpened) {
            this.setState({isFilterOpened: true});
        }      
    }

    getSearchResult() {
        let searchReasult = (
            <InfiniteBeerList 
                loading={this.props.loading}
                beers={this.props.beers}
            />
        );
        if(this.props.error) {
            searchReasult = <Message text={FETCH_FAIL_MESSAGE}/>;
        } else if(this.props.isAllFetched) {
            if(this.props.beers.length === 0) {
                searchReasult = <Message text={SEARCH_FAIL_MESSAGE}/>;
            }
        }
        
        return searchReasult;
    }
}

SearchableBeerList = connect(mapStateToProps, { fetchBeers, resetBeers })(SearchableBeerList);

export default SearchableBeerList;