import React, {Component} from 'react';
import {Drawer, Header} from '../../components';

import SearchableList from '../SearchableList';

export default class MenuNav extends Component {
    constructor(props) {
        super(props);
        this.state = {isDrawerOpened: false};

        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    toggleDrawer() {
        this.setState({isDrawerOpened: !this.state.isDrawerOpened});
    }

    render() {
        return (
            <div>
                <Drawer isOpened={this.state.isDrawerOpened} />
                <Header isButtonActive={this.state.isDrawerOpened} handleOpenDrawerButtonClick={this.toggleDrawer} />
                <SearchableList />
            </div>
        )    
    }
}