import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

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
            <div class="account-menu">
                <div class="account-menu__content">
                    {this.renderUserAvatar()}
                    <hr class="dropdown-divider"/>
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
            <Link to="/" class="dropdown-item">
                Account settings
            </Link>
            <Link to="/" class="dropdown-item">
                Sign out
            </Link>
        </Fragment>
    )

    renderGuestMenu = () => (
        <Fragment>
            <Link to="/" class="dropdown-item">
                Sign in
            </Link>
            <Link to="/" class="dropdown-item">
                Register
            </Link>
        </Fragment>
    )

    renderUserAvatar() {
        const avatarImage = this.user && this.user.imageUrl
            ? <img className="account-details__avatar" src={this.user.imageUrl}/>
            : <div className="account-details__avatar"/>;

        return (
            <Link to="/" className="account__details">
                <figure className="account-details">
                    {avatarImage}
                    {this.renderUserDetails()}
                </figure>
            </Link>
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

