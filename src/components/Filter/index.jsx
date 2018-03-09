import React, {Component} from 'react';

export default class Filter extends Component {
    render() {
        return (
            <div style={{display: this.props.isOpened ? 'block': 'none'}}>filter</div>
        )
    }
}