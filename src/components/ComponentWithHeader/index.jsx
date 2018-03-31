import React, { Component, Fragment } from 'react';

import '../common/styles/text-modifiers.css';

export default class ComponentWithHeader extends Component {
    render() {
        return (
            <Fragment>
                <header className="title is-3 is-capitalized">{this.props.headerText}</header>
                <div>{this.props.children}</div>
            </Fragment>
        );
    }
}