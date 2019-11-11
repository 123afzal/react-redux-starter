import uuid from "node-uuid";
import moment from "moment";

export const initialState = {
    todos: [
        {
            id: uuid(),
            todo: "watch film",
            completed: false,
            createdAt: moment().unix(),
            dueDate: moment().add(5,'day').unix(),
            completedAt: undefined
        },
        {
            id: uuid(),
            todo: "go for walk",
            completed: false,
            createdAt: moment().unix(),
            dueDate: moment().add(3,'day').unix(),
            completedAt: undefined
        },
        {
            id: uuid(),
            todo: "go to gym",
            completed: false,
            createdAt: moment().unix(),
            dueDate: moment().add(6,'day').unix(),
            completedAt: undefined
        }],
    activeItem:0,
    todo: {},
    trashedTodos: []
};
export const todayDate = moment().unix();