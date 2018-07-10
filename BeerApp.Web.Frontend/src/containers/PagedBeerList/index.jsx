import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchBeers from '../../actions/actionCreators/favoriteBeersList';
import {
    getPagedFavoriteBeers,
    getPageNumber,
    getPagesCount,
    getPerPageCount,
    isFetching,
    isFetchFailed
} from '../../reducers/favoritesBeerList';

import { BeerList, Loader, PagingPanel, Message } from '../../components';

import { NO_FAVORITES_MESSAGE, SERVER_ERROR_MESSAGE } from '../../constants';

import './paged-list.css';

const mapStateToProps = (state, ownProps) => ({
    beers: getPagedFavoriteBeers(state),
    activePageNumber: getPageNumber(state),
    pagesCount: getPagesCount(state),
    perPageCount: getPerPageCount(state),
    loading: isFetching(state),
    isLoadingFailed: isFetchFailed(state),
    urlPageNumber: Number(ownProps.match.params.pageNumber) || 1
});

export class PagedBeerList extends Component {
    componentWillMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.urlPageNumber !== this.props.urlPageNumber) {
            this.fetchData();
        }
    }

    fetchData() {
        this.props.fetchBeers(this.props.urlPageNumber);
    }

    render() {
        return (
            <section className="section container paged-list">
                <header className="title is-2 paged-list__title">
                    Your favorite beers
                </header>
                <main className="paged-list__list">
                    {this.renderFavoritesList()}
                </main>
                <footer className="paged-list__footer">
                    {this.renderPagingPanel()}
                </footer>
            </section>
        );
    }

    renderFavoritesList = () => {
        if (this.props.loading) {
            return <Loader />;
        }

        if (this.props.isLoadingFailed) {
            return <Message text={SERVER_ERROR_MESSAGE}/>;
        }

        const { beers } = this.props;

        return beers.length
            ? (
                <BeerList
                    beers={this.props.beers}
                    isColumnList
                    isExpanded
                />
            )
            : <Message text={NO_FAVORITES_MESSAGE}/>;
    }

    renderPagingPanel = () => (
        this.props.loading
            ? null
            : (
                <PagingPanel
                    startPageNumber={1}
                    totalPagesCount={this.props.pagesCount}
                    interval={this.props.perPageCount}
                    activePageNumber={this.props.activePageNumber}
                />
            )
    )
}

export default withRouter(connect(mapStateToProps, { fetchBeers })(PagedBeerList));

