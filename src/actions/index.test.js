import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";

const mockStore = configureMockStore([thunk, promiseMiddleware]);
import * as actions from './index'

describe('actions', () => {
    let store;

    beforeEach(() => {
        store = mockStore();
    });

    it('should create an action to toogle a todo', () => {
        const id = '112121csdfsdf-dsf2df456sdf';
        const expectedAction = {
            type: "TOGGLE_TODO",
            id
        };
        store.dispatch(actions.toggleTodo('112121csdfsdf-dsf2df456sdf'));
        expect(store.getActions()[0]).toEqual(expectedAction);
    })
});