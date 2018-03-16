import React, { Component } from 'react';

import classNames from 'classnames';
import uuid from 'random-uuid-v4';

export default class ButtonGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {active: this.props.active || 1};
    }

    render() {
        return (
            <div className="buttons has-addons is-centered">
                {this.makeGroup(this.props.count, this.state.active)}
            </div>
        );
    }

    makeGroup(count, active) {
        if(count < 1) return;

        let group = [];
        for(let i = 1; i <= count; i++) {
            const buttonClass = classNames('button', {'is-info': i === active});
            group.push(
                <button
                    key={(i === active) ? uuid() : i} 
                    className={buttonClass}
                    onClick={this.handleOnClick}>
                    {i}
                </button>
            );
        }

        return group;
    }

    handleOnClick = (event) => {
        this.setState({active: +event.target.textContent});
        if(this.props.onClick) {
            this.props.onClick(+event.target.textContent);
        }
    }
}