import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './drawer-container.css';
import './drawer.css';
import './primary-navigation.css';


const DRAWER_SELECTOR = '[role="drawer"]';

class Drawer extends Component  {
    
    componentDidMount() {
        this.addOnClickListener();
    }

    componentWillUnmount() {
        this.removeOnClickListener();
    }

    render() {
        const {isOpened, closeDrawer} = this.props;
        return (     
            <aside 
                className={classNames('drawer-container', { 'drawer-container--opened': isOpened})} 
                onClick={closeDrawer}>
                <nav className="drawer" style={{display: isOpened ? 'block' : 'none'}} role="drawer">
                    <header className="hero is-info drawer__header">
                        <span className="title is-5">Beer Catolog</span>
                    </header> 
                    <nav className="primary-navigation drawer__content">
                        <Link to="/" className="primary-navigation-item" href="#">
                            <i className="material-icon primary-navigation__icon" aria-hidden="true">inbox</i>
                            <span>Home</span>
                        </Link>
                        <Link to="favorites" className="primary-navigation-item" href="#">
                            <i className="material-icon primary-navigation__icon" aria-hidden="true">star</i>
                            <span>Favorites</span>
                        </Link>
                    </nav>
                </nav>
            </aside>
        )
    }

    addOnClickListener = () => {
        const drawer = document.querySelector(DRAWER_SELECTOR);
        if(drawer) {
            drawer.addEventListener('click', this.stopPropagation);
        }
    }

    removeOnClickListener = () => {
        const drawer = document.querySelector(DRAWER_SELECTOR);
        if(drawer) {
            drawer.removeEventListener('click', this.stopPropagation);
        }
    }

    stopPropagation = (event) => {
        event.stopPropagation();
    }
}

export default Drawer;