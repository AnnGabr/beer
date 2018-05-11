import React, { Component, Fragment } from 'react';

import { SettingsLink, SignOutLink, SignInLink, SignUpLink } from '../../common/links';

import './account-menu.css';
import './account-details.css';

export default class AccountMenu extends Component {
    constructor(props) {
        super(props);

        this.user = {
            nickName: 'AnnGabr',
            email: 'annabaks1997@gmail.com'
        };
    }

    render() {
        return (
            <div className="account-menu">
                <div className="account-menu__content">
                    {this.renderUserAvatar()}
                    <hr className="dropdown-divider"/>
                    {this.renderMenu()}
                </div>
            </div>
        );
    }

    renderMenu = () => (
        this.user ? this.renderUserMenu() : this.renderGuestMenu()
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
                Register
            </SignUpLink>
        </Fragment>
    )

    renderUserAvatar() {
        const avatarImage = this.user && this.user.imageUrl
            ? <img className="account-details__avatar" src={this.user.imageUrl} alt="avatar"/>
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

    renderUserDetails = () => (
        this.user
            ? (
                <Fragment>
                    <span className="account-details__nickname is-block">{this.user.nickName}</span>
                    <span className="account-details__email is-block">{this.user.email}</span>
                </Fragment>
            )
            : <span className="account-details__nickname is-block">Stranger</span>
    )
}

