import React, { Component } from 'react';

import PropertiesList from '../PropertiesList';
import ComponentWithHeader from '../ComponentWithHeader';

export default class BeerMethod extends Component {
    render() {
        const { properties } = this.props;

        return (
            <ComponentWithHeader headerText="method">
                {'meth here'}
            </ComponentWithHeader>
        );
    }
}