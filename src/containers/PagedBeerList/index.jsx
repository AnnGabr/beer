import React, {Component} from 'react';
import { connect } from 'react-redux';

import { resetBeers } from '../../actions/actionCreators/beerList';
import { fetchFavorites } from '../../actions/actionCreators/favorites';

import { BeerList, Loader, ButtonGroup } from '../../components';

import './paged-list.css';

const mapStateToProps = (state) => ({
    ...state.beerList, 
    beerCount: state.favorites.beerIds.length
});

class PagedBeerList extends Component {
    constructor(props) {
        super(props);

        this.currentPage = props.startPage || 1;
        this.perPage = props.perPage || 5;      
    }

    componentDidMount() {
        this.fetchData(this.currentPage, this.perPage)      
    }

    fetchData(newPage) {
        this.props.resetBeers();
        this.props.fetchFavorites(newPage, this.perPage);
    }

    handlePageClick = (newPage) => {  
        if(newPage !== this.currentPage) {
            this.fetchData(newPage);
            this.currentPage = newPage;
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
                        isColumnList={true}
                        isExpanded={true}
                    />
                    <Loader loading={this.props.loading}/>
                </main>
                <footer className="paged-list__footer">
                    <ButtonGroup 
                        count={Math.ceil(this.props.beerCount/this.perPage)}
                        onClick={this.handlePageClick} 
                    />
                </footer>
            </section>
        )  
    }
}

PagedBeerList = connect(mapStateToProps, { fetchFavorites, resetBeers })(PagedBeerList);

export default PagedBeerList;