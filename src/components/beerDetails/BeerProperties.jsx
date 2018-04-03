import React, { Component } from 'react';

import PropertiesList from './PropertiesList';
import ComponentWithHeader from './ComponentWithHeader';

const BEER_PROPERTIES_INFO = {
    alcoholVolume: {
        acronym: 'abv',
        explanation: 'alcohol by volume'
    },
    internationalBitternessUnits: {
        acronym: 'ibu',
        explanation: 'international bitterness units'
    },
    colorEbc: {
        acronym: 'ebc',
        explanation: 'color by ebc'
    }
};

export default class BeerProperties extends Component {
    render() {
        return (
            <ComponentWithHeader headerText="properties">
                <PropertiesList content={this.getContent()} />
            </ComponentWithHeader>
        );
    }

    getContent() {
        const { properties } = this.props;
        const propertysNames = Object.keys(properties);

        const content = [];
        propertysNames.forEach((propertyName) => {
            if (properties[propertyName] && BEER_PROPERTIES_INFO[propertyName]) {
                content.push({
                    name: BEER_PROPERTIES_INFO[propertyName].acronym,
                    tooltipText: BEER_PROPERTIES_INFO[propertyName].explanation,
                    value: properties[propertyName]
                });
            }
        });

        return content;
    }
}
