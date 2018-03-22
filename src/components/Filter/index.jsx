import React, {Component} from 'react';

import Slider from '../Slider';

import './filters.css';

export default class Filter extends Component {
    componentDidMount() {
        this.updateFilter();
    }

    handleFilterChange = () => {
        this.updateFilter();
    }

    updateFilter() {
        this.value = {
            alcoholVolume: this.alcoholVolume.value,
            internationalBitternessUnits: this.internationalBitternessUnits.value,
            colorEbc: this.colorEbc.value
        };
    }

    render() {
        const alcoholVolumeSlider = (
            <Slider                  
                min="2"
                max="14"
                sliderRef={range => this.alcoholVolume = range}
                onChange={this.handleFilterChange}
            />
        );
        const internationalBitternessUnitsSlider = (
            <Slider                  
                min="0"
                max="120"
                sliderRef={range => this.internationalBitternessUnits = range} 
                onChange={this.handleFilterChange}
            />
        );
        const colorEbcSlider = (
            <Slider 
                min="4"
                max="80"
                sliderRef={range => this.colorEbc = range}
                onChange={this.handleFilterChange}
            />
        );

        return (
            <div className="filters">
                <div className="filters__header title is-6">Filter results</div>
                <div className="filters__content">
                    <ul className="filters__list">
                        <li className="filters__list-item">
                            Alcohol by volum
                        </li>
                        <li className="filters__list-item">
                            International Bitterness units
                        </li>
                        <li className="filters__list-item">
                            Color by EBC
                        </li>
                    </ul>
                    <ul className="filters__list">
                        <li className="filters__list-item">
                            {alcoholVolumeSlider}
                        </li>
                        <li className="filters__list-item">
                            {internationalBitternessUnitsSlider}
                        </li>
                        <li className="filters__list-item">
                            {colorEbcSlider}
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}