import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchBeers } from '../../actions/actionCreators/favoritesBeerList';
import { setRequest } from '../../actions/actionCreators/favoritesRequest';

import { BeerList, Loader, PagingPanel } from '../../components';

import './paged-list.css';

const mapStateToProps = (state, ownProps) => ({
    ...state.favoritesBeerList,
    ...state.favorites,
    beerCount: state.favorites.beerIds.length
});

class PagedBeerList extends Component {
    constructor(props) {
        super(props);

        this.currentPageNumber = props.activePageNumber || 1;
        this.beersPerPageCount = props.beersPerPageCount || 5;  
        this.totalPagesCount = Math.ceil(props.beerCount/this.beersPerPageCount);
    }

    componentWillMount() {
        this.props.setRequest({
            pageNumber: this.currentPageNumber,
            beersPerPageCount: this.beersPerPageCount,
            beerIds: this.props.beerIds
        });
        this.fetchData();      
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
        )  
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
                    onClick={this.handlePageClick} 
                    interval={this.beersPerPageCount}
                    activePageNumber={this.currentPageNumber}
                />
            )
    )

    handlePageClick = (newPageNumber) => {  
        if(newPageNumber !== this.currentPageNumber) {
            this.updateFetchParams(newPageNumber);
            this.fetchData();
            this.currentPageNumber = newPageNumber;
        }
    } 

    updateFetchParams(newPageNumber) {
        this.props.setRequest({
            pageNumber: newPageNumber
        }); 
    }

    fetchData() {
        this.props.fetchBeers();
    }
}

PagedBeerList = withRouter(connect(mapStateToProps, { fetchBeers, setRequest })(PagedBeerList));

export default PagedBeerList;