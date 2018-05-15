import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { SettingsLink, SignOutLink, SignInLink, SignUpLink } from '../../common/links';

import { getUser } from '../../../reducers/account';

import './account-menu.css';
import './account-details.css';

const mapStateToProps = state => ({
    user: getUser(state)
});

export class AccountMenu extends Component {
    render() {
        return (
            <div className="account-menu">
                <div className="account-menu__content" onClick={this.props.onMenuClick}>
                    {this.renderUserAvatar()}
                    <hr className="dropdown-divider"/>
                    {this.renderMenu()}
                </div>
            </div>
        );
    }

    renderMenu = () => (
        this.props.user ? this.renderUserMenu() : this.renderGuestMenu()
    )

    renderUserMenu = () => (
        <Fragment>
            <SettingsLink className="dropdown-item">
                Settings
            </SettingsLink>
            <SignInLink className="dropdown-item">
                Change account
            </SignInLink>
            <SignOutLink className="dropdown-item">
                Sign out
            </SignOutLink>
        </Fragment>
    )

    renderGuestMenu = () => (
        <Fragment>
            <SignInLink className="dropdown-item">
                Sign in
            </SignInLink>
            <SignUpLink className="dropdown-item">
                Sign up
            </SignUpLink>
        </Fragment>
    )

    renderUserAvatar() {
        const { user } = this.props;
        const avatarImage = user && user.avatarUrl
            ? <img className="account-details__avatar" src={user.avatarUrl} alt="avatar"/>
            : <div className="account-details__avatar"/>;

        return (
            <SettingsLink className="account__details">
                <figure className="account-details">
                    {avatarImage}
                    {this.renderUserDetails()}
                </figure>
            </SettingsLink>
        );
    }

    renderUserDetails = () => {
        const { user } = this.props;

        return this.props.user
            ? (
                <Fragment>
                    <span className="account-details__nickname is-block">{user.nickName}</span>
                    <span className="account-details__email is-block">{user.email}</span>
                </Fragment>
            )
            : <span className="account-details__nickname is-block">Stranger</span>;
    }
}

export default connect(mapStateToProps)(AccountMenu);

