import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Searchbar, Filter, Message, InfiniteBeerList} from '../../components';

import {fetchBeers, fetchMoreBeers} from '../../actions/actionCreators/landingBeerList';
import {setRequest, setDefaultRequest} from '../../actions/actionCreators/landingRequest';

import {SEARCH_FAIL_MESSAGE, FETCH_FAIL_MESSAGE} from '../../constants';

const mapStateToProps = state => ({
    ...state.landingBeerList
});

class SearchableBeerList extends Component {
    constructor(props) {
        super(props);

        this.state = {isFilterOpened: false};
    }

    componentWillMount() {
        this.setDefaultRequest();
        this.fetchData();
    }

    render() {
        const filter = this.state.isFilterOpened
            ? <Filter ref={node => this.filter = node}/>
            :null;

        return (
            <section className="section container">
                <Searchbar onSearch={this.handleSearch}/>
                {filter}
                {this.getSearchResult()}
            </section>
        )
    }

    handleSearch = (beerName) => {
        this.setDefaultRequest();
        this.updateRequest(beerName);
        this.fetchData();
        
        if(!this.state.isFilterOpened) {
            this.setState({isFilterOpened: true});
        }      
    }

    setDefaultRequest() {
        this.props.setDefaultRequest();
    }

    updateRequest(beerName) {
        this.props.setRequest({
            urlParams: {
                name: beerName,
                filter: this.filter && this.filter.value,
            }
        });
    }

    fetchData() {
        this.props.fetchBeers();
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
        this.fetchMoreData();
    }

    fetchMoreData() {
        this.props.fetchMoreBeers();
    }
}

SearchableBeerList = connect(mapStateToProps,  { 
    fetchBeers, 
    fetchMoreBeers, 
    setRequest, 
    setDefaultRequest 
})(SearchableBeerList);

export default SearchableBeerList;
