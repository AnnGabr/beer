import React, {Component} from 'react';
import { connect } from 'react-redux';

import { fetchBeers, resetBeers } from '../../actions/actionCreators/beerList';
import { setRequest } from '../../actions/actionCreators/request';
import { retrieveExpanded } from '../../utils/beers-filters';

import { BeerList, Loader, ButtonGroup } from '../../components';

import './paged-list.css';

const mapStateToProps = (state) =>({
    ...state.beerList, ...state.favorites
});

class PagedBeerList extends Component {

    componentDidMount() {
        this.props.setRequest({
            type: "GET_BY_IDS",
            urlParams: {
                perPage: 5,
                ids: this.props.beerIds
            }
        });
        this.props.fetchBeers(retrieveExpanded);
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
                {this.props.beerIds.length > 5 && (
                    <footer className="paged-list__footer">
                        <ButtonGroup 
                            count={Math.ceil(this.props.beerIds.length/5)}
                            onClick={this.handlePageClick} />
                    </footer>
                )}
            </section>
        )  
    }

    handlePageClick = (page) => {
        console.log(this.props.beerIds.slice((page - 1)*5, 5*page));
        this.props.resetBeers();
        this.props.setRequest({
            type: "GET_BY_IDS",
            urlParams: {
                perPage: 5,
                ids: this.props.beerIds.slice((page - 1)*5, 5*page)
            }
        });
        this.props.fetchBeers(retrieveExpanded);
    }
}

PagedBeerList = connect(mapStateToProps, { fetchBeers, resetBeers, setRequest })(PagedBeerList);

export default PagedBeerList;