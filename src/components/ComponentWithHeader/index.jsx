import React, { Component, Fragment } from 'react';

export default class ComponentWithHeader extends Component {
    render() {
        return (
            <Fragment>
                <header className="title is-3">{this.props.headerText}</header>
                <div>{this.props.children}</div>
            </Fragment>
        );
    }
}