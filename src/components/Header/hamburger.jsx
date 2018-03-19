import React from 'react';
import classNames from 'classnames/dedupe';

import 'hamburgers/dist/hamburgers.min.css';

const Hamburger = ({onClick, isActive}) => {
    let hamburgerClass = classNames(
        'hamburger', 
        'is-block', 
        'is-paddingless', 
        'hamburger--spring', 
        {'is-active': isActive}
    );
    return(
        <div className={hamburgerClass} type="button" onClick={onClick}>
            <div className="hamburger-box is-block">
                <div className="hamburger-inner"></div>
            </div>
        </div>
    )
};

export default Hamburger;