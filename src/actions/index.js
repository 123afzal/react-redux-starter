import moment from 'moment';
import uuid from "node-uuid";

export const getTodos = () => (dispatch) => {
        dispatch({
            type: 'GET_TODOS'
        });
};

export const toggleTodo = (id) => (dispatch) => {
    dispatch({
        type: 'TOGGLE_TODO',
        id
    });
};

export const addTodo = (obj) => (dispatch) => {
    let todo = {
        todo: obj.todoText,
        completed: false,
        createdAt: moment().unix(),
        completedAt: null,
        dueDate: moment(obj.dueDate).unix(),
        id: uuid(),
    };
    dispatch({
        type: 'ADD_TODO',
        todo
    });
    dispatch(changeIndex(0))

};

export const saveEditTodo = (obj) => (dispatch) => {
    let todo = {
        ...obj,
        dueDate: moment(obj.dueDate).unix(),
    };
    dispatch({
        type: 'SAVE_EDIT_TODO',
        editedTodo: todo,
        id:todo.id
    });
    dispatch(changeIndex(0))
};

export const deleteTodo = (id) => (dispatch) => {
    dispatch({
        type:'DELETE_TODO',
        id
    })
};


export const changeIndex = (index) => (dispatch) => {
    dispatch({
        type: 'CHANGE_CURRENT_NAV',
        index
    });
};

export const editTodo = (id) =>  (dispatch) => {
    dispatch({
        type: 'EDIT_TODO',
        id
    });
    dispatch(changeIndex(3))
};