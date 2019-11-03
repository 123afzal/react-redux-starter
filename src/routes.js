import React from 'react';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import TodoApp from "./todo-app";
import PendingTodos from "./components/pending-todos/pending-todos";
import CompletedTodos from "./components/complete-todos/complete-todos";
import AddTodo from "./components/add-todo/add-todo";

const Routes = () => {
    return (
        <Router history={browserHistory}>
            <Route path="/" component={TodoApp}>
                <IndexRoute component={PendingTodos}/>
                <Route path="" component={PendingTodos}/>
                <Route path="completetodos" component={CompletedTodos}/>
                <Route path="addtodo" component={AddTodo}/>
            </Route>
        </Router>
    )
};

export default Routes;