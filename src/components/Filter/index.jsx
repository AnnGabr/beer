import React, {Component} from 'react';
import {connect} from 'react-redux';

import {setRequest} from '../../actions/actionCreators/request';

import Slider from '../Slider';

import './filters.css';

class Filter extends Component {
    handleFilterChange = () => {
        this.props.setRequest({
            urlParams: {
                filter: {
                    abv_lt: this.alcVolume.value,
                    ibu_lt: this.internBitUnits.value,
                    ebc_lt: this.colorEbc.value
                }
            }
        });
    }

    render() {
        return (
            <div className="filters" style={{display: this.props.isOpened ? 'block': 'none'}}>
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
                            <Slider                  
                                min="2"
                                max="14"
                                sliderRef={range => this.alcVolume = range}
                                onChange={this.handleFilterChange}
                            />
                        </li>
                        <li className="filters__list-item">
                            <Slider                  
                                min="0"
                                max="120"
                                sliderRef={range => this.internBitUnits = range} 
                                onChange={this.handleFilterChange}
                            />
                        </li>
                        <li className="filters__list-item">
                            <Slider 
                                min="4"
                                max="80"
                                sliderRef={range => this.colorEbc = range}
                                onChange={this.handleFilterChange}
                            />
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

Filter = connect(null, { setRequest })(Filter);

export default Filter;