import React, {Component} from 'react';

export default class Header extends Component {
    render() {
        return (
            <button className="button" style={{color: this.props.isButtonActive && 'green'}} onClick={this.props.handleOpenDrawerButtonClick} type="button">
                Open
            </button>
        )
    }
}