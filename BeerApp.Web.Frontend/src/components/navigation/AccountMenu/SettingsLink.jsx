import React, { Component } from 'react';
import { ModalLink } from 'react-router-modal';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';

import Modal from '../../common/Modal';

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
