import React, { Component } from 'react';

import ComponentWithHeader from './ComponentWithHeader';
import SimpleList from './SimpleList';

export default class BeerFoodPairing extends Component {
    render() {
        const { variants } = this.props;
        const content = variants.map(variant => ({
            info: variant
        }));

        return (
            <ComponentWithHeader headerText="food pairing">
                <SimpleList content={content} hasBorder/>
            </ComponentWithHeader>
        );
    }
}