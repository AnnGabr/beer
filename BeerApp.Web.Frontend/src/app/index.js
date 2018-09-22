import React, { Component } from 'react';

import { Drawer, Header, AccountMenu } from '../components';
import Router from './routes';

import 'bulma/css/bulma.css';
import 'react-router-modal/css/react-router-modal.css';
import './index.css';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDrawerOpened: false,
            isAccountMenuOpened: false
        };
    }

    render() {
        return (
            <div className="layout">
                {this.renderDrawer()}
                <Header
                    onHamburgerClick={this.toggleDrawer}
                    onAccountMenuClick={this.toggleAccountMenu}
                >
                    {this.renderAccountMenu()}
                </Header>
                <Router />
            </div>
        );
    }

    renderAccountMenu = () => (
        this.state.isAccountMenuOpened
            ? <AccountMenu onMenuClick={this.toggleAccountMenu}/>
            : null
    )

    toggleAccountMenu = () => {
        this.setState({ isAccountMenuOpened: !this.state.isAccountMenuOpened });
    }

    renderDrawer = () => (
        this.state.isDrawerOpened
            ? <Drawer onClick={this.toggleDrawer}/>
            : null
    )

    toggleDrawer = () => {
        this.setState({ isDrawerOpened: !this.state.isDrawerOpened });
    }
}
