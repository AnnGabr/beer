import React, { Component } from 'react';

import { Drawer, Header } from './components';
import { Router } from './routes';

import 'bulma/css/bulma.css';
import './index.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {isDrawerOpened: false};  
  }

  render() {
    return (
      <div className="layout">
        {this.state.isDrawerOpened && <Drawer onClick={this.toggleDrawer}/>}
        <Header onHamburgerClick={this.toggleDrawer}/>
        <Router />
      </div>
    );
  }

  toggleDrawer = () => {
    this.setState({isDrawerOpened: !this.state.isDrawerOpened});
  }
}
