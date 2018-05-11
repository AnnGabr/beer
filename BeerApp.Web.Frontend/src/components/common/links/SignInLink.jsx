import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class SignInLink extends Component {
    render() {
        const path = `${this.props.location.pathname}/account/signin`.replace('//', '/');

        return (
            <Link to={path} className={this.props.className} >
                {this.props.children}
            </Link>
        );
    }
}

export default withRouter(connect()(SignInLink));
