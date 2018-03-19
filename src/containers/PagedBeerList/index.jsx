import React, {Component} from 'react';
import { connect } from 'react-redux';

import { resetBeers, fetchBeers } from '../../actions/actionCreators/beerList';
import { setRequest } from '../../actions/actionCreators/request';
import { requestTypes } from '../../utils/api';

import { mapToFavoritesModels } from '../../utils/beers-filters';

import { BeerList, Loader, PagingPanel } from '../../components';

import './paged-list.css';

const mapStateToProps = (state) => ({
    ...state.beerList,
    ...state.favorites,
    beerCount: state.favorites.beerIds.length
});

class PagedBeerList extends Component {
    constructor(props) {
        super(props);

        this.currentPage = props.startPage || 1;
        this.perPage = props.perPage || 5;  
        this.pageCount = Math.ceil(props.beerCount/this.perPage);
    }

    componentWillMount() {
        this.props.setRequest({
            type: requestTypes.GET_BY_IDS,
            urlParams: {
                page: this.currentPage,
                perPage: this.perPage,
                ids: this.props.beerIds
            }
        });
    }

    componentDidMount() {
        this.fetchData(this.currentPage);      
    }

    fetchData(newPage) {
        this.props.setRequest({
            urlParams:{
                page: newPage
            }
        });
        this.props.resetBeers();
        this.props.fetchBeers(mapToFavoritesModels);
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
                    <Loader loading={this.props.loading}/>
                </main>
                <footer className="paged-list__footer">
                    <PagingPanel 
                        count={this.pageCount}
                        onClick={this.handlePageClick} 
                        gap={this.perPage}
                    />
                </footer>
            </section>
        )  
    }

    handlePageClick = (newPage) => {  
        if(newPage !== this.currentPage) {
            this.fetchData(newPage);
            this.currentPage = newPage;
        }
    } 
}

PagedBeerList = connect(mapStateToProps, { fetchBeers, resetBeers, setRequest })(PagedBeerList);

export default PagedBeerList;