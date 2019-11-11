import React from "react";

import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

import {initialState} from '../../utils/storeInnitialState';
import TrashedTodos, {ComponentTrashedTodos} from "./trashed-todos";
const mockStore = configureMockStore();
const store = mockStore(initialState);

describe("Trashed Todos Component", () => {

    it("should render without throwing an error", () => {
        expect(
            shallow(
                <Provider store={store}>
                    <TrashedTodos/>
                </Provider>
            ).exists()
        ).toBe(true);
    });

    // push two todos in trashed array for testing purpose;
    initialState.trashedTodos.push(initialState.todos[0]);
    initialState.trashedTodos.push(initialState.todos[1]);
    initialState.todos.splice(0,2);
    it("should render only 'Two' deleted todos", async () => {
        let wrapper = mount(
            <Provider store={store}>
                <ComponentTrashedTodos {...initialState}/>
            </Provider>);
        // console.log(wrapper.debug());
        expect(wrapper.find('Todo').length).toEqual(2);
    });
});