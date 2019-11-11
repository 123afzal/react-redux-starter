import React from "react";

import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

import {initialState} from '../../utils/storeInnitialState';
import CompletedTodos, {ComponentCompletedTodos} from "./complete-todos";
const mockStore = configureMockStore();
const store = mockStore(initialState);

describe("Completed Todos Component", () => {

    it("should render without throwing an error", () => {
        expect(
            shallow(
                <Provider store={store}>
                    <CompletedTodos/>
                </Provider>
            ).exists()
        ).toBe(true);
    });
    //mark one todo as completed for testing purpose
    initialState.todos[0].completed = true;

    it("should render only completed todo", async () => {
        let wrapper = mount(
            <Provider store={store}>
                <ComponentCompletedTodos {...initialState}/>
            </Provider>);
        // console.log(wrapper.debug());
        expect(wrapper.find('Todo').length).toEqual(1);
    });

});