import React, { Component } from 'react';

import SimpleList from './SimpleList';
import ComponentWithHeader from './ComponentWithHeader';

export default class BeerIngredients extends Component {
    render() {
        return (
            <ComponentWithHeader headerText="ingredients">
                <SimpleList content={this.getContent()} hasBorder/>
            </ComponentWithHeader>
        );
    }

    getContent() {
        return [
            this.getWater(),
            this.getMalt(),
            this.getHops(),
            this.getYeast()
        ].filter(item => !!item);
    }

    getWater() {
        const { water } = this.props;
        if (!water) {
            return null;
        }

        return {
            title: 'water',
            info: `${water.value} ${water.unit}`
        };
    }

    getMalt() {
        const { malt } = this.props;
        if (!malt || malt.length === 0) {
            return null;
        }

        const info = [];
        malt.forEach((item, index) => {
            info.push(
                <span key={index} className="is-block">
                    {`"${item.name}" - ${item.amount.value} ${item.amount.unit}`}
                </span>
            );
        });

        return {
            title: 'malt',
            info
        };
    }

    getHops() {
        const { hops } = this.props;
        if (!hops || hops.length === 0) {
            return null;
        }

        const info = [];
        hops.forEach((item, index) => {
            info.push(
                <span key={index} className="is-block">
                    {`"${item.name}" - ${item.amount.value} ${item.amount.unit}, add when ${item.add}`}
                </span>
            );
        });

        return {
            title: 'hops',
            info
        };
    }

    getYeast() {
        const { yeast } = this.props;

        return {
            title: 'yeast',
            info: yeast
        };
    }
}
