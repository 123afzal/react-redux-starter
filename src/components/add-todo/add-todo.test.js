import React from "react";

import { configure, shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import {initialState} from '../../utils/storeInnitialState';
import AddTodo, {ComponentAddTodo} from "./add-todo";
import {addTodo} from "../../actions";
const mockStore = configureMockStore();
const store = mockStore(initialState);

describe("Add TODO Component", () => {

    it("should render without throwing an error", () => {
        expect(
            shallow(
                <Provider store={store}>
                    <AddTodo/>
                </Provider>
            ).exists()
        ).toBe(true);
    });

    it("should add new todo", () => {
        const mockAddTodo = jest.fn();
        const root =  mount(
            <Provider store={store}>
                <ComponentAddTodo addTodo={mockAddTodo}/>
            </Provider>);


        //this approach is for un-controlled components
        root.find('input#newtodo').instance().value = "foo";
        root.find('input#newdate').instance().value = "2019-11-11";

        //this approach is for controlled components
        // root.find('#newtodo').simulate(
        //     'change',
        //     {target:
        //             {ref: 'todo', value: 'thisisit'}
        //     }
        // );
        // root.find('#newdate').simulate(
        //     'change',
        //     {target:
        //             {name: 'newdate', value: '2019-11-11'}
        //     }
        // );
        //
        root.find('#addTodoForm').simulate(
            'submit',
            {preventDefault() {}}
        );
        expect(mockAddTodo.mock.calls[0][0]).toEqual(
            {todoText: 'foo', dueDate: '2019-11-11'}
        )
    });

});