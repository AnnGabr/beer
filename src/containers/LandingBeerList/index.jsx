import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Message, InfiniteList, BeerList } from '../../components';

import { fetchSearchResult } from '../../actions/actionCreators/landingSearch';
import { getLandingBeerListState } from '../../reducers/landingBeerList';

import { NO_SEARCH_RESULTS_MESSAGE, FETCH_FAIL_MESSAGE } from '../../constants';

const mapStateToProps = state => ({
    ...getLandingBeerListState(state)
});

export class LandingBeerList extends Component {
    componentWillMount() {
        this.fetchDefaultData();
    }

    fetchDefaultData() {
        this.props.fetchSearchResult({});
    }

    render() {
        return this.getSearchResult();
    }

    getSearchResult() {
        let searchReasult = (
            <InfiniteList
                scrollableComponent={this.props.scrollableComponent}
                onEndAchive={this.fetchMoreData}
                loading={this.props.loading}
            >
                <BeerList beers={this.props.beers} />
            </InfiniteList>
        );
        if (this.props.error) {
            searchReasult = <Message text={FETCH_FAIL_MESSAGE} />;
        } else if (this.props.isAllFetched) {
            if (this.props.beers.length === 0) {
                searchReasult = <Message text={NO_SEARCH_RESULTS_MESSAGE} />;
            }
        }

        return searchReasult;
    }

    fetchMoreData = () => {
        this.props.fetchSearchResult(null);
    };
}

export default connect(mapStateToProps, { fetchSearchResult })(LandingBeerList);

