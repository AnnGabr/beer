import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class SettingsLink extends Component {
    render() {
        const path = `${this.props.location.pathname}/account/settings`.replace('//', '/');

        return (
            <Link className={this.props.className} to={path} >
                {this.props.children}
            </Link>
        );
    }
}

export default withRouter(connect()(SettingsLink));
