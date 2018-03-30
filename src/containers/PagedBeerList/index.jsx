import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchBeers from '../../actions/actionCreators/favoriteBeersList';

import { BeerList, Loader, PagingPanel } from '../../components';

import './paged-list.css';

const mapStateToProps = (state, { match }) => ({
    ...state.favoritesBeerList,
    favoriteBeersIds: state.favorites.beerIds,
    beersCount: state.favorites.beerIds.length,
    activePageNumber: Number(match.params.pageNumber) || 1,
});

class PagedBeerList extends Component {
    constructor(props) {
        super(props);

        this.favoriteBeersIds = this.props.favoriteBeersIds;
        this.beersPerPageCount = props.beersPerPageCount || 5;
        this.totalPagesCount = Math.ceil(props.beersCount / this.beersPerPageCount);
    }

    componentWillMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.activePageNumber !== this.props.activePageNumber) {
            this.fetchData();
        }
    }

    render() {
        return (
            <section className="section container paged-list">
                <header className="title is-2 paged-list__title">
                    Your favorite beers
                </header>
                <main className="paged-list__list">
                    <BeerList
                        beers={this.props.beers}
                        isColumnList
                        isExpanded
                    />
                    {this.getLoader()}
                </main>
                <footer className="paged-list__footer">
                    {this.getPagingPanel()}
                </footer>
            </section>
        );
    }

    getLoader = () => (
        this.props.loading ? <Loader /> : null
    )

    getPagingPanel = () => (
        this.props.loading
            ? null
            : (
                <PagingPanel
                    totalPagesCount={this.totalPagesCount}
                    interval={this.beersPerPageCount}
                    activePageNumber={this.props.activePageNumber}
                />
            )
    )

    fetchData() {
        this.props.fetchBeers(this.getCurrentPageBeersIds());
    }

    getCurrentPageBeersIds() {
        const startIndex = (this.props.activePageNumber - 1) * this.beersPerPageCount;
        const endIndex = startIndex + this.beersPerPageCount;

        return this.favoriteBeersIds.slice(startIndex, endIndex);
    }
}

PagedBeerList = withRouter(connect(mapStateToProps, { fetchBeers })(PagedBeerList));

export default PagedBeerList;
