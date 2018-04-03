import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { Searchbar, Filter } from '../../components';

import fetchSearchResult from '../../actions/actionCreators/landingSearch';

const mapStateToProps = state => ({
    isSearchDisabled: state.landingBeerList.loading,
});

export class LandingSearchPanel extends Component {
    constructor(props) {
        super(props);

        this.state = { isFilterOpened: false };
    }

    render() {
        return (
            <Fragment>
                <Searchbar onSearch={this.handleSearch} isDisabled={this.props.isSearchDisabled} />
                {this.getFilter()}
            </Fragment>
        );
    }

    handleSearch = (beerName) => {
        this.props.fetchSearchResult({
            beerName,
            filter: this.filter && this.filter.value,
        });

        if (!this.state.isFilterOpened) {
            this.setState({ isFilterOpened: true });
        }
    };

    getFilter = () => (
        this.state.isFilterOpened
            ? <Filter ref={(node) => { this.filter = node; }}/>
            : null
    );
}

export default connect(mapStateToProps, { fetchSearchResult })(LandingSearchPanel);
