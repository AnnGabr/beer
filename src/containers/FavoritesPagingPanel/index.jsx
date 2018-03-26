import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchBeers } from '../../actions/actionCreators/favoritesBeerList';

import { PagingPanel } from '../../components';

const mapStateToProps = (state, ownProps) => ({
    ...state.favoritesBeerList,
    ...state.favorites,
    beerCount: state.favorites.beerIds.length
});

class PagedBeerList extends Component {
    constructor(props) {
        super(props);

        this.currentPageNumber = 1;
        this.beersPerPageCount = 5;  
        this.totalPagesCount = Math.ceil(props.beerCount/this.beersPerPageCount);
        this.favorites = props.beerIds;
    }

    render() {
        return this.getPagingPanel();
    }

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
            const fetchParams = {
                beerIds
            };
            this.fetchData();
            this.currentPageNumber = newPageNumber;
        }
    } 

    fetchData() {
        this.props.fetchBeers();
    }
}

PagedBeerList = withRouter(connect(mapStateToProps, { fetchBeers })(PagedBeerList));

export default PagedBeerList;