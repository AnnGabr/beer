import React, {Component} from 'react';
import { connect } from 'react-redux';

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
        this.linksPerPage = props.linksPerPage || 5;  
        this.totalPagesCount = Math.ceil(props.beerCount/this.linksPerPage);
    }

    componentDidMount() {
        this.props.setRequest({
            urlParams: {
                page: this.currentPageNumber,
                perPage: this.linksPerPage,
                ids: this.props.beerIds
            }
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
                        isColumnList={true}
                        isExpanded={true}
                    />
                    {this.props.loading && <Loader />}
                </main>
                <footer className="paged-list__footer">
                    <PagingPanel 
                        totalPagesCount={this.totalPagesCount}
                        onClick={this.handlePageClick} 
                        interval={this.linksPerPage}
                        activePageNumber={this.currentPageNumber}
                    />
                </footer>
            </section>
        )  
    }

    handlePageClick = (newPageNumber) => {  
        if(newPageNumber !== this.currentPageNumber) {
            this.updateRequest(newPageNumber);
            this.fetchData();
            this.currentPageNumber = newPageNumber;
        }
    } 

    updateRequest(newPageNumber) {
        this.props.setRequest({
            urlParams:{
                page: newPageNumber
            }
        }); 
    }

    fetchData() {
        this.props.fetchBeers();
    }
}

PagedBeerList = connect(mapStateToProps, { fetchBeers, setRequest })(PagedBeerList);

export default PagedBeerList;