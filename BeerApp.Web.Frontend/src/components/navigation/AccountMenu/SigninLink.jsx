import React, { Component } from 'react';
import { ModalLink } from 'react-router-modal';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class SigninLink extends Component {
    render() {
        const path = `${this.props.location.pathname}/account/signin`.replace('//', '/');

        return (
            <Link className={this.props.className} to={path}>
                {this.props.children}
            </Link>
        );
    }
}

export default withRouter(connect()(SigninLink));
