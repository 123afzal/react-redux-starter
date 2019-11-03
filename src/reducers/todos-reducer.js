import uuid from "node-uuid";
import moment from "moment";

const initialState = {
    todos: [
        {
            id: uuid(),
            todo: "watch film",
            completed: false,
            createdAt: moment().unix(),
            completedAt: undefined
        },
        {
            id: uuid(),
            todo: "go for walk",
            completed: false,
            createdAt: moment().unix(),
            completedAt: undefined
        },
        {
            id: uuid(),
            todo: "go to gym",
            completed: false,
            createdAt: moment().unix(),
            completedAt: undefined
        }]
};

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
                todos:[
                    ...state.todos,
                    action.todo
                ]
            };
        default:
            return state;
    }
};

export default todos_reducer;