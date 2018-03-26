import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Message, InfiniteBeerList} from '../../components';

import {fetchSearchResult} from '../../actions/actionCreators/landingSearch';

import {SEARCH_FAIL_MESSAGE, FETCH_FAIL_MESSAGE} from '../../constants';

const mapStateToProps = state => ({
    ...state.landingBeerList
});

class LandingBeerList extends Component {
    componentWillMount() {
        this.fetchDefaultData();
    }

    fetchDefaultData() {
        this.props.fetchSearchResult({});
    }

    render() {
        let searchReasult = (
            <InfiniteBeerList 
                scrollableComponent={this.props.scrollableComponent}
                onEndAchive={this.fetchMoreData}
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

    fetchMoreData = () => {
        this.props.fetchSearchResult(null);
    }
}

LandingBeerList = connect(mapStateToProps, { fetchSearchResult })(LandingBeerList);

export default LandingBeerList;