import React, {Component} from 'react';
import { connect } from 'react-redux';

import { fetchBeers } from '../../actions/actionCreators/beerList';
import { setRequest } from '../../actions/actionCreators/request';
import { retrieveExpanded } from '../../utils/beers-filters';

import { BeerList, Loader } from '../../components';

import './paged-list.css';

const mapStateToProps = (state) =>({
    ...state.beerList
});

class PagedBeerList extends Component {

    componentDidMount() {
        this.props.setRequest({
            type: "GET_BY_IDS",
            urlParams: {
                ids: [1, 2, 3]
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
                <footer>
                    
                </footer>
            </section>
        )  
    }
}

PagedBeerList = connect(mapStateToProps, { fetchBeers, setRequest })(PagedBeerList);

export default PagedBeerList;