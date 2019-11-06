import React from "react";

import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import TodoApp from './todo-app';

import {initialState} from './utils/storeInnitialState';
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