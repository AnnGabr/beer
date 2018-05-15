import React, { Component } from 'react';
import Hamburger from './hamburger';

import './header.css';

export default class Header extends Component {
    render() {
        return (
            <div className="navbar header is-primary">
                <div className="header__navigation">
                    <div className="navbar-item">
                        <Hamburger onClick={this.props.onHamburgerClick} />
                    </div>
                    <div className="navbar-item">
                        <h1 className="header__site-name">B e e r C a t a l o g</h1>
                    </div>
                </div>
                <div className="header__menu">
                    {this.renderAccountButton()}
                    {this.rendeAccountMenu()}
                </div>
            </div>
        );
    }

    renderAccountButton = () => (
        <div className="navbar-item account-button">
            <span className="material-icon header-account-icon is-block" aria-hidden="true" onClick={this.props.onAccountMenuClick}>
                account_circle
            </span>
        </div>
    )

    rendeAccountMenu = () => this.props.children
}

