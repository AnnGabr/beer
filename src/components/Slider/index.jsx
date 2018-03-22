import React, {Component} from 'react';

import './input.css';
import './slider.css';

export default class Slider extends Component { 
    constructor(props) {
        super(props);
        this.state = {value: this.props.min};
    }

    render(){
        const {onChange, sliderRef, ...sliderRestParams} = this.props;
        return (
            <div className="slider">
                <div className="slider__value">
                    {this.state.value}
                </div>
                <input 
                    type="range"
                    value={this.state.value}
                    ref={sliderRef}
                    onChange={this.handleOnChange}
                    {...sliderRestParams}     
                />
            </div>
        );
    }

    handleOnChange = (event) => {
        this.setState({value: event.target.value});
        
        this.props.onChange(this.state.value)
    }
}