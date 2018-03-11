import React from 'react';

import './loader.css';

const Loader = ({role, loading}) => (
    <div 
        className="loader-wrapper"
        style={{display: loading ? 'block':'none'}}>
        <div className="list-loader" />
    </div>
)

export default Loader;