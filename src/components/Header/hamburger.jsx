import React from 'react';
import classNames from 'classnames/dedupe';

import 'hamburgers/dist/hamburgers.min.css';

const Hamburger = ({onClick, isActive}) => {
    let hamburgerClass = classNames('hamburger', 'hamburger--spring', {'is-active': isActive});
    return(
        <button className={hamburgerClass} type="button" onClick={onClick}>
            <span className="hamburger-box">
                <span className="hamburger-inner"></span>
            </span>
        </button>
    )
};

export default Hamburger;