import React, { Component } from 'react';

import Slider from '../Slider';

import './filter.css';

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
            <div className="filter">
                <div className="filter__header title is-6">Filter results</div>
                <div className="filter__content">
                    <ul className="filter__list">
                        <li className="filter__list-item filter__name filter__abv"></li>
                        <li className="filter__list-item filter__name filter__ibu"></li>
                        <li className="filter__list-item filter__name filter__ebc"></li>
                    </ul>
                    <ul className="filter__list filter__sliders">
                        <li className="filter__list-item">{this.getAlcoholVolumeSlider()}</li>
                        <li className="filter__list-item">
                            {this.getInternationalBitternessUnitsSlider()}
                        </li>
                        <li className="filter__list-item">{this.getColorEbcSlider()}</li>
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
