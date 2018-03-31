import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { SimpleList, PropertiesList, ComponentWithHeader } from '../../components';
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

const test2 = [{
    name: 'Ludo',
    tooltipText: 'from the values set in \nthe previous file',
    value: '6'
},
{
    name: 'Daspo',
    tooltipText: 'from the values set in the previous file',
},
{
    name: 'Uget',
    tooltipText: 'from the values set in the previous file',
}];

class BeerDetails extends Component {
    componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        const { match } = this.props;
    }

    render() {
        const { some } = this.props;

        return (
            <section className="section container">
                <BeerMainInfo {...maininfo} />
                <ComponentWithHeader headerText="Properties">
                    <PropertiesList content={test2}/>
                </ComponentWithHeader>
                <ComponentWithHeader headerText="Food Paring">
                    <SimpleList content={test} hasBorder/>
                </ComponentWithHeader>
            </section>
        );    
    }
}

export default withRouter(connect()(BeerDetails));
