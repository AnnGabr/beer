import React, { Component } from 'react';

import Slider from '../Slider';

import './filters.css';

export default class Filter extends Component {
    componentDidMount() {
        this.updateFilter();
    }

    handleFilterChange = () => {
        this.updateFilter();
    };

    updateFilter() {
        this.value = {
            alcoholVolume: this.alcoholVolume.value,
            internationalBitternessUnits: this.internationalBitternessUnits.value,
            colorEbc: this.colorEbc.value,
        };
    }

    render() {
        return (
            <div className="filters">
                <div className="filters__header title is-6">Filter results</div>
                <div className="filters__content">
                    <ul className="filters__list">
                        <li className="filters__list-item">Alcohol by volume</li>
                        <li className="filters__list-item">International Bitterness units</li>
                        <li className="filters__list-item">Color by EBC</li>
                    </ul>
                    <ul className="filters__list">
                        <li className="filters__list-item">{this.getAlcoholVolumeSlider()}</li>
                        <li className="filters__list-item">
                            {this.getInternationalBitternessUnitsSlider()}
                        </li>
                        <li className="filters__list-item">{this.getColorEbcSlider()}</li>
                    </ul>
                </div>
            </div>
        );
    }

    getAlcoholVolumeSlider = () => (
        <Slider
            min="2"
            max="14"
            sliderRef={(range) => { this.alcoholVolume = range; }}
            onChange={this.handleFilterChange}
        />
    );

    getInternationalBitternessUnitsSlider = () => (
        <Slider
            min="0"
            max="120"
            sliderRef={(range) => { this.internationalBitternessUnits = range; }}
            onChange={this.handleFilterChange}
        />
    );

    getColorEbcSlider = () => (
        <Slider
            min="4"
            max="80"
            sliderRef={(range) => { this.colorEbc = range; }}
            onChange={this.handleFilterChange}
        />
    );
}
