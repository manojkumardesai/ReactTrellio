import React, { Component } from 'react';
import Header from '../components/Header/Header';
import Lists from '../components/Lists/Lists';
import { connect } from 'react-redux';

class ReactListContainer extends Component {
    render() {
        return (
            <div>
                <Header label="Add List" clicked={this.props.onAddList} />
                {this.props.user.map((usrList) => {
                    let userTasks;
                    if (this.props.task) {
                        userTasks = this.props.task.filter((tsk) => tsk.listId === usrList.id);
                    }
                    return (
                        <Lists key={usrList.id}
                            label="Add Task"
                            tasks={userTasks ? userTasks : []}
                            user={usrList}
                            clicked={this.props.onAddTask}
                            dragOverHere={this.props.onDragOver}
                            dragStartHere={this.props.onDragStart}
                            dragDropHere={this.props.onDrop}
                        ></Lists>
                    )
                })}
            </div>
        );
    }

}

const mapStateToProps = state => {
    localStorage.setItem('userList', JSON.stringify(state.userList));
    localStorage.setItem('taskList', JSON.stringify(state.tasks));
    return {
        user: state.userList,
        task: state.tasks
    };
};


const mapDispatchToProps = dispatch => {
    return {
        initialize: () => dispatch({ type: 'INIT' }),
        onAddList: () => dispatch({ type: 'ADDLIST', listName: 'List 1' }),
        onDeleteList: () => dispatch({ type: 'DELETELIST', listName: 'List 1' }),
        onAddTask: (listId) => dispatch({ type: 'ADDTASK', listId: listId }),
        onDeleteTask: () => dispatch({ type: 'DELETETASK', taskName: 'Task 1' }),
        onDragOver: (event) => dispatch({ type: 'DRAGGED', event: event }),
        onDragStart: (event, prop) => dispatch({ type: 'DRAGSTART', event: event, prop: prop }),
        onDrop: (event, prop) => dispatch({ type: 'DRAGDROP', event: event, prop: prop }),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ReactListContainer);