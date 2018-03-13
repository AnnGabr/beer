import React, {Component} from 'react';

import './input.css';
import './slider.css';

class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = { value: this.props.min };
    }

    handleOnChange = (event) => {
        this.setState({value: event.target.value});
    }

    render(){
        return (
            <div className="slider">
                <div className="slider__value">
                    {this.state.value}
                </div>
                <input 
                    type="range"
                    value = {this.state.value}
                    onChange={this.handleOnChange}
                    {...this.props}     
                />
            </div>
        );
    }
}

export default Slider;