import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Searchbar, Filter, Message, InfiniteBeerList} from '../../components';

import {fetchBeers, resetBeers} from '../../actions/actionCreators/landingBeerList';
import {setRequest} from '../../actions/actionCreators/landingRequest';

import {mapToLandingModels} from '../../utils/beers-filters';

import {SEARCH_FAIL_MESSAGE, FETCH_FAIL_MESSAGE} from '../../constants';

const mapStateToProps = state => ({
    ...state.landingBeerList
});

class SearchableBeerList extends Component {
    constructor(props) {
        super(props);

        this.state = {isFilterOpened: false};
    }

    componentDidMount() {
        this.fetchBeers();
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
        this.fetchBeers();
        if(!this.state.isFilterOpened) {
            this.setState({isFilterOpened: true});
        }      
    }

    getSearchResult() {
        let searchReasult = (
            <InfiniteBeerList 
                scrollableComponent={this.props.scrollableComponent}
                onEndAchive={this.handleEndAchive}
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

    handleEndAchive = () => {
        this.fetchBeers();
    }

    fetchBeers() {
        this.props.fetchBeers(mapToLandingModels);
    }
}

SearchableBeerList = connect(mapStateToProps, { fetchBeers, resetBeers, setRequest })(SearchableBeerList);

export default SearchableBeerList;