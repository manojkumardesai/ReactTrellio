import React from 'react';

import './Tasks.css';

const taskControl = (props) => (
    <div className="Tasks" draggable onDragStart={(event) => props.dragFunc(event, props.task)}>
        {props.task.name}
    </div>
);

export default taskControl;