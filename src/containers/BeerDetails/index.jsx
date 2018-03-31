import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { SimpleList, ComponentWithHeader } from '../../components';
import { BeerMainInfo , BeerProperties, BeerFoodPairing } from '../../components/beerDetails';

const test = [
    "Spicy carne asada with a pico de gallo sauce",
    "Shredded chicken tacos with a mango chilli lime salsa",
    "Cheesecake with a passion fruit swirl sauce"
];

const maininfo = {
    imageUrl: 'https://images.punkapi.com/v2/192.png',
    name: 'some',
    tagline: 'some tagline ipsume dagotten',
    description: "Our flagship beer that kick started the craft beer revolution. This is James and Martin's original take on an American IPA, subverted with punchy New Zealand hops. Layered with new world hops to create an all-out riot of grapefruit, pineapple and lychee before a spiky, mouth-puckering bitter finish.",
    isFavorite: true
}

const test2 = {
    colorEbc: 6,
    internationalBitternessUnits: 130,
    alcoholVolume: 13
};

class BeerDetails extends Component {
    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const { match } = this.props;
    }

    render() {
        return (
            <section className="section container">
                <BeerMainInfo {...maininfo} />
                <BeerProperties properties={test2}/>
                <BeerFoodPairing variants={test} />
            </section>
        );    
    }
}

export default withRouter(connect()(BeerDetails));
