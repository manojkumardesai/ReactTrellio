const initialState = {
    userList: [{
        id: 0,
        name: 'First List'
    }],
    tasks: [{
        id: 0,
        name: 'First Task',
        listId: 0
    }]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT':
            let newUserList;
            let newTaskList;
            if (localStorage.getItem('userList')) {
                newUserList = JSON.parse(localStorage.getItem('userList'));
            }
            if (localStorage.getItem('taskList')) {
                newTaskList = JSON.parse(localStorage.getItem('taskList'));
            }
            return {
                ...state,
                userList: newUserList,
                tasks: newTaskList
            }
        case 'ADDLIST':
            const newList = {
                id: Math.random(),
                name: action.listName,
                tasks: []
            };
            const updatedList = [...state.userList];
            updatedList.push(newList);
            return {
                ...state,
                userList: updatedList
            }
        case 'DELETELIST':
            let filteredList = [...state.userList];
            filteredList = filteredList.filter(user => user.id !== action.id);
            return {
                userList: filteredList
            }
        case 'ADDTASK':
            const dateObj = Math.random();
            const newTask = {
                id: dateObj,
                name: 'New Task @ ' + dateObj.toFixed(3),
                listId: action.listId
            };
            const updatedTaskList = [...state.tasks];
            updatedTaskList.push(newTask);
            return {
                ...state,
                tasks: updatedTaskList
            }
        case 'DELETETASK':
            const deleteTaskState = Object.assign({}, state);
            deleteTaskState.userList.push(newTask);
            return {
                userList: deleteTaskState.userList
            }
        case 'DRAGGED':
            action.event.preventDefault();
            return {
                ...state
            }
        case 'DRAGSTART':
            action.event.dataTransfer.setData('sourceList', JSON.stringify(action.prop));
            return {
                ...state
            }
        case 'DRAGDROP':
            const droppedTask = JSON.parse(action.event.dataTransfer.getData('sourceList', action.prop));
            const changeTaskList = [...state.tasks];
            const toBeChanged = changeTaskList.filter(task => task.id === droppedTask.id);
            toBeChanged[0].listId = action.prop;
            return {
                ...state,
                tasks: changeTaskList
            }
        default:
            return state;
    }
}

export default reducer;