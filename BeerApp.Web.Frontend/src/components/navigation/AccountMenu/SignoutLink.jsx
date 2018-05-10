import React, { Component } from 'react';
import { ModalLink } from 'react-router-modal';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class SignoutLink extends Component {
    render() {
        return (
            <a className="dropdown-item">
                {this.props.children}
            </a>
        );
    }
}

export default withRouter(connect()(SignoutLink));
