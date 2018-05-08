import React, { Component } from 'react';
import Hamburger from './hamburger';

import './header.css';

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = { isAccountMenuOpened: false };
    }

    render() {
        return (
            <div className="navbar header is-primary">
                <div className="header__navigation">
                    <div className="navbar-item">
                        <Hamburger onClick={this.props.onHamburgerClick} />
                    </div>
                    <div className="navbar-item">
                        <h1 className="header__site-name">Beer Catalog</h1>
                    </div>
                </div>
                <div className="header__menu">
                    {this.renderAccountButton()}
                    {this.rendeAccountMenu()}
                </div>
            </div>
        );
    }

    renderAccountButton() {
        return this.props.children
            ? (
                <div className="navbar-item account-button">
                    <span className="material-icon header-account-icon is-block" aria-hidden="true" onClick={this.toggleAccountMenu}>
                        account_circle
                    </span>
                </div>
            )
            : null;
    }

    rendeAccountMenu = () => (
        this.state.isAccountMenuOpened
            ? this.props.children
            : null
    );

    toggleAccountMenu = () => {
        this.setState({ isAccountMenuOpened: !this.state.isAccountMenuOpened });
    }
}

