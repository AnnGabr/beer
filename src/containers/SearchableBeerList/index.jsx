import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Searchbar, Filter, Message} from '../../components';
import InfiniteBeerList from '../InfiniteBeerList';

import {fetchBeers, resetBeers} from '../../actions/actionCreators/beerList';
import {setRequest} from '../../actions/actionCreators/request';

import {mapToLandingModels} from '../../utils/beers-filters';

import {SEARCH_FAIL_MESSAGE, FETCH_FAIL_MESSAGE} from '../../constants';

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
                {this.state.isFilterOpened && <Filter ref={node => this.filter = node}/>}
                {this.getSearchResult()}
            </section>
        )
    }

    handleSearch = (beerName) => {
        this.props.setRequest({
            urlParams: {
                page: 1,
                name: beerName,
                filter: this.filter && this.filter.value
            }
        });
        this.props.resetBeers();
        this.props.fetchBeers(mapToLandingModels);
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

SearchableBeerList = connect(mapStateToProps, { fetchBeers, resetBeers, setRequest })(SearchableBeerList);

export default SearchableBeerList;