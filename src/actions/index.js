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

export const addTodo = (text) => (dispatch) => {
    let todo = {
        todo: text,
        completed: false,
        createdAt: moment().unix(),
        completedAt: null,
        id: uuid(),
    };
    dispatch({
        type: 'ADD_TODO',
        todo
    });
};