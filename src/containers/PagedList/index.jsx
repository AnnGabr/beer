import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchBeers } from '../../actions/actionCreators/beerList';
import FavoriteBeerList from '../InfiniteBeerList';

import './paged-list.css';

const mapStateToProps = (state) =>({
    ...state.beerList
});

class PagedList extends Component {
    componentDidMount() {
        fetchBeers();
    }

    render() {
        return (
            <section className="section container paged-list">
                <header className="title is-2 paged-list__title">
                    Your favorite beers
                </header>
                <main>
                    <FavoriteBeerList 
                        beers={this.props.beers}
                        isColumnList={true}
                        isExpanded={true}
                    />
                </main>
                <footer>
                    
                </footer>
            </section>
        )  
    }
}

PagedList = connect(mapStateToProps, { fetchBeers })(PagedList);

export default PagedList;