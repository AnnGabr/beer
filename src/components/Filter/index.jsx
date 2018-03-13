import React, {Component} from 'react';
import {connect} from 'react-redux';

import {setRequest} from '../../actions/actionCreators/request';

import Slider from '../Slider';

import './filters.css';

class Filter extends Component {
    handleFilterChange = (event) => {
        //this.props.onValueChanged();
        console.log('slider');
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
                                step="0.1"
                                onDragEnd={this.handleFilterChange}
                            />
                        </li>
                        <li className="filters__list-item">
                            <Slider
                                min="0"
                                max="120"
                                onDragEnd={this.handleFilterChange}
                            />
                        </li>
                        <li className="filters__list-item">
                            <Slider
                                min="4"
                                max="80"
                                onDragEnd={this.handleFilterChange}
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