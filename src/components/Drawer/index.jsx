import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './drawer-container.css';
import './drawer.css';
import './primary-navigation.css';

const Drawer = ({onClick}) =>  {
    const containerClass = classNames(
        'drawer-container', 
        'drawer-container--opened'
    );

    return (     
        <aside className={containerClass} onClick={onClick}>
            <nav className="drawer" onClick={this.stopPropagation}>
                <header className="hero is-info drawer__header">
                    <span className="title is-5">Beer Catolog</span>
                </header> 
                <nav className="primary-navigation drawer__content">
                    <Link to='/' className="primary-navigation-item">
                        <span className="material-icon primary-navigation__icon" aria-hidden="true">inbox</span>
                        <span>Home</span>
                    </Link>
                    <Link to='/favorites/page=1' className="primary-navigation-item">
                        <span className="material-icon primary-navigation__icon" aria-hidden="true">star</span>
                        <span>Favorites</span>
                    </Link>
                </nav>
            </nav>
        </aside>
    )
}

export default Drawer;