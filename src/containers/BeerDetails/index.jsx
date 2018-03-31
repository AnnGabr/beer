import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { SimpleList, ComponentWithHeader } from '../../components';
import BeerProperties from '../../components/beerDetails/BeerProperties';
import { BeerMainInfo } from '../../components/beerDetails';

const test = [{
    title: 'Ludo',
    info: 'from the values set in \nthe previous file',
},
{
    title: 'Daspo',
    info: 'from the values set in the previous file',
},
{
    title: 'Uget',
    info: 'from the values set in the previous file',
}];

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
                <ComponentWithHeader headerText="Properties">
                    <BeerProperties properties={test2}/>
                </ComponentWithHeader>
                <ComponentWithHeader headerText="Food Paring">
                    <SimpleList content={test} hasBorder/>
                </ComponentWithHeader>
            </section>
        );    
    }
}

export default withRouter(connect()(BeerDetails));
