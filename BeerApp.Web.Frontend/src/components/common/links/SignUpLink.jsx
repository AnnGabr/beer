import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class SignUpLink extends Component {
    render() {
        const path = `${this.props.location.pathname}/account/signup`.replace('//', '/');

        return (
            <Link to={path} className={this.props.className}>
                {this.props.children}
            </Link>
        );
    }
}

export default withRouter(connect()(SignUpLink));
