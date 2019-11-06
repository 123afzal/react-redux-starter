import uuid from "node-uuid";
import moment from "moment";
import {initialState} from '../utils/storeInnitialState'

const todos_reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'GET_TODOS':
            return state;
        case 'TOGGLE_TODO':
            let updatedTodos = state.todos.map((todo) => {
                if(todo.id === action.id){
                    todo.completed = !todo.completed;
                    todo.completedAt = todo.completed ? moment().unix() : undefined
                }
                return todo
            });
            return {
                ...state,
                todos: updatedTodos
            };
        case 'ADD_TODO':
            return {
                ...state,
                todos:[
                    action.todo,
                    ...state.todos
                ]
            };
        case 'EDIT_TODO':
            let todo = state.todos.find(obj => obj.id === action.id);
            return {
                ...state,
                todo:{...todo}
            };
        case 'SAVE_EDIT_TODO':
            return {
                ...state,
                todo: {},
                todos: state.todos.map((todo) => {
                    if(action.id === todo.id){
                        return {
                             ...action.editedTodo
                        }
                    } else {
                        return todo
                    }
                })
            };
        case 'DELETE_TODO':
            let todoToDelete = state.todos.find(todo => todo.id === action.id);
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.id),
                trashedTodos: [todoToDelete, ...state.trashedTodos]
            };
        case 'RESTORE_TODO':
            let todoToRestore = state.trashedTodos.find(todo => todo.id === action.id);
            return  {
                ...state,
                todos: [todoToRestore, ...state.todos],
                trashedTodos: state.trashedTodos.filter(todo => todo.id !== action.id)
            }
        case 'CHANGE_CURRENT_NAV':
            return {
                ...state,
                activeItem: action.index
            };
        default:
            return state;
    }
};

export default todos_reducer;