import React from 'react';

import './loader.css';

const Loader = ({loading}) => loading && (
    <div className="loader-wrapper">
        <div className="list-loader" />
    </div>)

export default Loader;