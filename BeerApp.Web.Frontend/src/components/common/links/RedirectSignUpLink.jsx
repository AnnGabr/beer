import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export class RedirectSignUpLink extends Component {
    render() {
        const path = `${this.props.location.pathname}/account/signin`.replace('//', '/');

        return (
            <Redirect to={path} className={this.props.className}>
                {this.props.children}
            </Redirect>
        );
    }
}

export default withRouter(connect()(RedirectSignUpLink));
