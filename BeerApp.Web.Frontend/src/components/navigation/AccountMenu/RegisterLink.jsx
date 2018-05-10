import React, { Component } from 'react';
import { ModalLink } from 'react-router-modal';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class RegisterLink extends Component {
    render() {
        const path = `${this.props.location.pathname}/account/register`.replace('//', '/');

        return (
            <Link to={path} className={this.props.className}>
                {this.props.children}
            </Link>
        );
    }
}

export default withRouter(connect()(RegisterLink));
