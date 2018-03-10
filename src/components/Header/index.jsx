import React from 'react';
import Hamburger from './hamburger';

import './header.css';

const Header = ({onHamburgerClick, isHamburgerActive}) => (
    <div className="navbar header is-primary">
        <Hamburger onClick={onHamburgerClick} isActive={isHamburgerActive} />
        <h1 className="header__site-name">Beer Catalog</h1>
    </div>
);

export default Header;