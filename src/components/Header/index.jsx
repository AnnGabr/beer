import React from 'react';
import Hamburger from './hamburger';

import './header.css';

const Header = ({onHamburgerClick, isHamburgerActive}) => (
    <div className="navbar header is-primary">
        <div className="navbar-item">
            <Hamburger 
                onClick={onHamburgerClick} 
                isActive={isHamburgerActive} 
            />
        </div>
        <div className="navbar-item">
            <h1 className="header__site-name">Beer Catalog</h1>
        </div>
    </div>
);

export default Header;