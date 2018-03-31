import React, { Component } from 'react';

import PropertiesList from '../PropertiesList';
import ComponentWithHeader from '../ComponentWithHeader';

export default class BeerProperties extends Component {
    render() {
        const { properties } = this.props;
        const content = [
            {
                name: 'abv',
                tooltipText: 'alcohol by volume',
                value: properties.alcoholVolume
            },
            {
                name: 'ibu',
                tooltipText: 'international bitterness units',
                value: properties.internationalBitternessUnits
            },
            {
                name: 'ebc',
                tooltipText: 'color by ebc',
                value: properties.colorEbc
            },
        ];

        return (
            <ComponentWithHeader headerText="properties">
                <PropertiesList content={content} />
            </ComponentWithHeader>
        );
    }
}
