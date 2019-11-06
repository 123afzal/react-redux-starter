import React from "react";

import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import ConnectedPendingTodos, {PendingTodos} from './pending-todos';

import {initialState} from '../../utils/storeInnitialState';
const mockStore = configureMockStore();
let store;

beforeEach(() => {
    store = mockStore(initialState)
});

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
});