import reducer from './todos-reducer';
import {initialState} from '../utils/storeInnitialState'
import moment from "moment";
import uuid from "node-uuid";


describe('todos reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    });

    it('should handle ADD_TODO', () => {
        let todo = {
            todo: 'obj.todoText',
            completed: false,
            createdAt: moment().unix(),
            completedAt: null,
            dueDate: moment("2019-11-10").unix(),
            id: uuid(),
        };
        expect(
            reducer(undefined, {
                type: 'ADD_TODO',
                todo
            })
        ).toEqual({
            ...initialState,
            todos:[
                todo,
                ...initialState.todos
            ]});
    });

    it('should handle TOGGLE_TODO', () => {
        let id = initialState.todos[0].id;
        expect(
            reducer(undefined, {
                type: 'TOGGLE_TODO',
                id
            })
        ).toEqual(initialState);
    });

    it('should handle EDIT_TODO', () => {
        let id = initialState.todos[0].id;
        expect(
            reducer(undefined, {
                type: 'EDIT_TODO',
                id
            })
        ).toEqual({
            ...initialState,
            todo: initialState.todos[0]
        });
    });

    it('should handle SAVE_EDIT_TODO', () => {
        let todo = initialState.todos[0];
        todo.todo = "this is new text";
        expect(
            reducer(undefined, {
                type: 'SAVE_EDIT_TODO',
                editedTodo: todo,
                id:todo.id
            })
        ).toEqual(initialState);
    });

    it('should handle DELETE_TODO', () => {
        let id = initialState.todos[0].id;
        let updatedTodos = initialState.todos.filter(todo => todo.id !== id);
        let todo = initialState.todos.find(todo => todo.id === id);
        expect(
            reducer(undefined, {
                type: 'DELETE_TODO',
                id
            })
        ).toEqual({
            ...initialState,
            todos: updatedTodos,
            trashedTodos: [todo, ...initialState.trashedTodos]
        });
    });

    it('should handle RESTORE_TODO', () => {
        let cloneInitialState =  JSON.parse(JSON.stringify(initialState));
        let todo = cloneInitialState.todos[0];
        cloneInitialState.trashedTodos = [todo];
        cloneInitialState.todos = cloneInitialState.todos.filter(t => t.id !== todo.id);
        expect(
            reducer(cloneInitialState, {
                type: 'RESTORE_TODO',
                id: todo.id
            })
        ).toEqual(initialState);
    });
});