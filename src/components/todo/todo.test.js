import React from "react";

import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Todo from './todo';

import {initialState} from '../../utils/storeInnitialState';
import {browserHistory} from "react-router";
const mockStore = configureMockStore();
const store = mockStore(initialState);

describe("Todo Component", () => {
    it("should render without throwing an error", () => {
        expect(
            shallow(
                <Provider store={store}>
                    <Todo/>
                </Provider>
            ).exists()
        ).toBe(true);
    });

    let todo = initialState.todos[0];
    const onChange = jest.fn();
    let wrapper = mount(
        <Provider store={store}>
            <Todo {...todo}
                  key={todo.id}
                  onToggle={onChange}
                  showEdit={true}
                  showDelete={true}
            /></Provider>);

    it("should render todo text", () => {
        expect(wrapper.find('.todotext').text()).toEqual(todo.todo);
    });

    it("should render EDIT BUTTON when showEdit is passed true", () => {
        expect(wrapper.find('#edit-btn').exists()).toBe(true);
    });

    it("should render DELETE BUTTON when showDelete is passed true", () => {
        expect(wrapper.find('#del-btn').exists()).toBe(true);
    });

    it("should not render RESTORE BUTTON when showDelete is passed true", () => {
        expect(wrapper.find('#restore-btn').exists()).toBe(false);
    });

    it("should call onToggle Correctly",  () => {
        wrapper.find('#toggle-todo').simulate('click');
        expect(onChange).toHaveBeenCalled();
    });

    let wrapper2 = mount(<Provider store={store}>
                        <Todo {...todo}
                              onToggle={onChange}
                              key={todo.id}
                              showEdit={false}
                              showDelete={false}
                        />
                    </Provider>);

    it("should not render EDIT BUTTON when showEdit is passed false", () => {
        expect(wrapper2.find('#edit-btn').exists()).toBe(false);
    });

    it("should not render DELETE BUTTON when showDelete is passed false", () => {
        expect(wrapper2.find('#del-btn').exists()).toBe(false);
    });

    it("should render RESTORE BUTTON when showDelete is passed false", () => {
        expect(wrapper2.find('#restore-btn').exists()).toBe(true);
    });
});