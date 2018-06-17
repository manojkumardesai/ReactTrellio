import React from 'react';
import Tasks from './Tasks/Tasks';
import './Lists.css';

const listControl = (props) => (
    <div className="Lists"
        onDragOver={(event) => props.dragOverHere(event)}
        onDrop={(event) => props.dragDropHere(event, props.user.id)}
        >

        {props.user.name}
        
        {props.tasks.map((task) => (
            <Tasks key={task.id} task={task} dragFunc={props.dragStartHere}></Tasks>
        ))}
        
        <button onClick={() => props.clicked(props.user.id)}>
            {props.label}
        </button>
    </div>
);

export default listControl;