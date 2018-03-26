import React, {Component} from 'react';
import { connect } from 'react-redux';

import { fetchBeers } from '../../actions/actionCreators/favoritesBeerList';

import { BeerList, Loader } from '../../components';

const mapStateToProps = (state, ownProps) => ({
    ...state.favoritesBeerList
});

class FavoriteBeersList extends Component {
    componentWillMount() {
        this.fetchData();      
    }

    fetchData() {
        this.props.fetchBeers();
    }

    render() {
        return (
            <div>
                <BeerList 
                    beers={this.props.beers} 
                    isColumnList
                    isExpanded
                />
                {this.getLoader()}
            </div>
        )  
    }

    getLoader = () => (
        this.props.loading ? <Loader /> : null
    ) 
}

FavoriteBeersList = connect(mapStateToProps, { fetchBeers })(FavoriteBeersList);

export default FavoritesBeerList;