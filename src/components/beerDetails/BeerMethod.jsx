import React, { Component } from 'react';

import SimpleList from '../SimpleList';
import ComponentWithHeader from '../ComponentWithHeader';

export default class BeerMethod extends Component {
    render() {
        return (
            <ComponentWithHeader headerText="method">
                <SimpleList content={this.getContent()}/>
            </ComponentWithHeader>
        );
    }

    getContent() {
        return [
            this.getMash(),
            this.getTwist(),
            this.getFermentation()
        ].filter(item => !!item);
    }

    getMash() {
        const { mash } = this.props;
        if (!mash || mash.length === 0) {
            return null;
        }

        const info = [];
        mash.forEach((item, index) => {
            const { temp } = item;
            info.push(
                <span key={index} className="is-block">
                    {`${item.duration} minutes at ${temp.value} ${this.getShortenTemperatureUnit(temp.unit)}`}
                </span>
            );
        });

        return {
            title: 'malt',
            info
        };
    }

    getTwist() {
        const { twist } = this.props;
        if (!twist) {
            return null;
        }

        return {
            title: 'twist',
            info: twist
        };
    }

    getFermentation() {
        const { fermentation } = this.props;
        if (!fermentation) {
            return null;
        }

        const { temp } = fermentation;

        return {
            title: 'fermentation',
            info: `Performed at ${temp.value} ${this.getShortenTemperatureUnit(temp.unit)}`
        };
    }

    getShortenTemperatureUnit(temperatureType) {
        const temperatureUnit = (temperatureType === 'celsius') ? 'C' : 'F';

        return String.fromCharCode(176) + temperatureUnit;
    }
}
