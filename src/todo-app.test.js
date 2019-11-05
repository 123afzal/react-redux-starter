import React from "react";

import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import TodoApp from './todo-app';
import uuid from "node-uuid";
import moment from "moment";

const initialState = {
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
    trashedTodos: []};
const mockStore = configureMockStore();
const store = mockStore(initialState);

describe("TodoApp Component", () => {
    it("should render without throwing an error", () => {
        expect(
            shallow(
                <Provider store={store}>
                    <TodoApp/>
                </Provider>
            ).exists()
        ).toBe(true);
    });

    it("should display 4 navigation items",  () => {
        const wrapper = mount(
            <Provider store={store}>
                <TodoApp />
            </Provider>
        );
        expect(wrapper.find('.item')).toHaveLength(4);
    });
});