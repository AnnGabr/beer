import React, { Component } from 'react';

import './user-dropdown.css';

export default class DropdownMenu extends Component {
    render() {
        return (
            <div class="dropdown__menu">
                <div class="dropdown-content">
                    <a href="#" class="dropdown-item">
                        Dropdown item
                    </a>
                    <a class="dropdown-item">
                        Other dropdown item
                    </a>
                    <a href="#" class="dropdown-item is-active">
                        Active dropdown item
                    </a>
                    <a href="#" class="dropdown-item">
                        Other dropdown item
                    </a>
                    <hr class="dropdown-divider"/>
                    <a href="#" class="dropdown-item">
                        With a divider
                    </a>
                </div>
            </div>
        );
    }
}

