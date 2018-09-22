import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { hasActiveUser } from '../../../reducers/account';
import { signOut } from '../../../actions/actionCreators/account';

const mapStateToProps = state => ({
    hasActiveUser: hasActiveUser(state)
});

export class SignInLink extends Component {
    render() {
        return (
            <a className={this.props.className} onClick={this.handleLinkClick}>
                {this.props.children}
            </a>
        );
    }

    handleLinkClick = () => {
        if (this.props.hasActiveUser) {
            this.props.signOut()
                .then(this.goToSignInModal());
        } else {
            this.goToSignInModal();
        }
    }

    goToSignInModal() {
        const path = `${this.props.location.pathname}/account/signin`.replace('//', '/');
        this.props.history.push(path);
    }
}

export default withRouter(connect(mapStateToProps, { signOut })(SignInLink));
