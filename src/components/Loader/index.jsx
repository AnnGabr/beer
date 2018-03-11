import React from 'react';
import { connect } from "react-redux";
import classNames from 'classnames';

import './loader.css';

const Loader = ({variant, loading}) => (
    <div 
        className={classNames('loader-wrapper', variant)}
        style={{display: loading ? 'block':'none'}}>
        <div className="list-loader" />
    </div>
)

export default Loader;