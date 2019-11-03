import { combineReducers } from 'redux';
import todos from './todos-reducer';


const reducers = {
    todos
};

export default combineReducers(reducers);