import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { ComponentWithHeader } from '../../components';
import { BeerMainInfo, BeerProperties, BeerFoodPairing, BeerIngredients, BeerMethod } from '../../components/beerDetails';
import { fetchBeers } from '../../api/beerApi';
import { mapToDetailsModels } from '../../utils/beerFilters';

import './beer-details.css';
import '../../components/common/styles/row-list.css';

const mapStateToProps = state => ({
    favoriteBeersIds: state.favorites.beerIds
});

class BeerDetails extends Component {
    state = null;

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const { match } = this.props;

        fetchBeers({
            beerIds: [match.params.beerId]
        }).then(response => this.setState(mapToDetailsModels(response, this.props.favoriteBeersIds)[0]));
    }

    render() {
        if (!this.state) {
            return null;
        }

        const { mainInfo, foodPairing, method, brewersTips, ingredients, properties } = this.state;

        return (
            <div className="beer-details">
                <div className="beer-details__main-info">
                    <BeerMainInfo {...mainInfo}/>
                </div>
                <div className="row-list">
                    <div className="row-list__item beer-details__props">
                        <BeerProperties properties={properties}/>
                    </div>
                    <div className="row-list__item beer-details__pairing">
                        <BeerFoodPairing variants={foodPairing} />
                    </div>
                </div>
                <div className="row-list__item beer-details__brewing-tips">
                    <ComponentWithHeader headerText="brewing">
                        <p>{brewersTips}</p>
                    </ComponentWithHeader>
                </div>
                <div className="row-list">
                    <div className="row-list__item beer-details__ingredients">
                        <BeerIngredients {...ingredients}/>
                    </div>
                    <div className="row-list__item beer-details__method">
                        <BeerMethod {...method}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps)(BeerDetails));
