import React from 'react';

import './Header.css';

const headerControl = (props) => (
    <div className="HeaderControl" onClick={props.clicked}>
        {props.label}
    </div>
);

export default headerControl;