import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Searchbar, Filter, Message} from '../../components';
import InfiniteBeerList from '../InfiniteBeerList';

import {fetchBeers, resetBeers} from '../../actions/actionCreators/beerList';
import {setRequest} from '../../actions/actionCreators/request';
import { requestTypes } from '../../utils/api';

import {mapToLandingModels} from '../../utils/beers-filters';

import {SEARCH_FAIL_MESSAGE, FETCH_FAIL_MESSAGE} from '../../constants';

const mapStateToProps = state => ({
    ...state.beerList
});

class SearchableBeerList extends Component {
    constructor(props) {
        super(props);

        this.perPage = props.perPage || 9;
        this.state = {isFilterOpened: false};
    }

    componentWillMount() {
        this.props.setRequest({
            type: requestTypes.GET_BY_NAME,
            urlParams: {
                page: 1,
                perPage: this.perPage
            }
        });
        this.props.resetBeers();
        this.props.fetchBeers(mapToLandingModels);
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
                onEndAchive={this.handleEndAchive}
                loading={this.props.loading}
                beers={this.props.beers}
                perPage={this.perPage}
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

    handleEndAchive = () => {
        this.props.fetchBeers(mapToLandingModels);
    }
}

SearchableBeerList = connect(mapStateToProps, { fetchBeers, resetBeers, setRequest })(SearchableBeerList);

export default SearchableBeerList;