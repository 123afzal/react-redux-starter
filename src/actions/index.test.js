import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";

const mockStore = configureMockStore([thunk, promiseMiddleware]);
import * as actions from './index'
import {todayDate} from '../utils/storeInnitialState'
import moment from "moment";
import uuid from "node-uuid";

describe('actions', () => {
    let store;

    beforeEach(() => {
        store = mockStore();
    });

    it('should create an action to TOGGLE a TODO', () => {
        const id = '112121csdfsdf-dsf2df456sdf';
        const expectedAction = {
            type: "TOGGLE_TODO",
            id
        };
        store.dispatch(actions.toggleTodo('112121csdfsdf-dsf2df456sdf'));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });

    it('should create an action to DELETE a TODO', () => {
        const id = '112121csdfsdf-dsf2df456sdf';
        const expectedAction = {
            type: "DELETE_TODO",
            id
        };
        store.dispatch(actions.deleteTodo('112121csdfsdf-dsf2df456sdf'));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });

    it('should create an action to RESTORE a TODO', () => {
        const id = '112121csdfsdf-dsf2df456sdf';
        const expectedAction = {
            type: "RESTORE_TODO",
            id
        };
        store.dispatch(actions.restoreTodo('112121csdfsdf-dsf2df456sdf'));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });

    it('should create an action to EDIT a TODO', () => {
        const id = '112121csdfsdf-dsf2df456sdf';
        const expectedAction = {
            type: "EDIT_TODO",
            id
        };
        store.dispatch(actions.editTodo('112121csdfsdf-dsf2df456sdf'));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });

    it('should change NAVIGATION', () => {
        const index = 0;
        const expectedAction = {
            type: "CHANGE_CURRENT_NAV",
            index
        };
        store.dispatch(actions.changeIndex(index));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
});