import React, { Component } from 'react';

import { Drawer, Header, AccountMenu } from '../components';
import { Router } from './routes';

import 'bulma/css/bulma.css';
import './index.css';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = { isDrawerOpened: false };
    }

    render() {
        return (
            <div className="layout">
                {this.getDrawer()}
                <Header onHamburgerClick={this.toggleDrawer}>
                    <AccountMenu />
                </Header>
                <Router />
            </div>
        );
    }

    getDrawer = () => (
        this.state.isDrawerOpened
            ? <Drawer onClick={this.toggleDrawer}/>
            : null
    )

    toggleDrawer = () => {
        this.setState({ isDrawerOpened: !this.state.isDrawerOpened });
    }
}
