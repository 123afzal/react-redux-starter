import React from "react";

import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import {initialState} from '../../utils/storeInnitialState';
import PendingTodos, {ComponentPendingTodos} from "./pending-todos";
const mockStore = configureMockStore();
const store = mockStore(initialState);

describe("Pending Todos Component", () => {

    it("should render without throwing an error", () => {
        expect(
            shallow(
                <Provider store={store}>
                    <PendingTodos/>
                </Provider>
            ).exists()
        ).toBe(true);
    });

    it("should render all pending todos", async () => {
        let wrapper = mount(
            <Provider store={store}>
                <ComponentPendingTodos {...initialState}/>
            </Provider>);
        // console.log(wrapper.debug());
        expect(wrapper.find('Todo').length).toEqual(3);
    });
});