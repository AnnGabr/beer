import React from 'react';
import classNames from 'classnames/dedupe';

import 'hamburgers/dist/hamburgers.min.css';

const Hamburger = ({ onClick }) => {
    const hamburgerClass = classNames('hamburger', 'is-block', 'is-paddingless', 'hamburger--spring');

    return (
        <div className={hamburgerClass} onClick={onClick}>
            <div className="hamburger-box is-block">
                <div className="hamburger-inner" />
            </div>
        </div>
    );
};

export default Hamburger;
