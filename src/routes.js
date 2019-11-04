import React from 'react';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import TodoApp from "./todo-app";
import PendingTodos from "./components/pending-todos/pending-todos";
import CompletedTodos from "./components/complete-todos/complete-todos";
import AddTodo from "./components/add-todo/add-todo";
import EditTodo from "./components/edit-todo/edit-todo";
import TrashedTodos from "./components/trashed-todos/trashed-todos";

const Routes = () => {
    return (
        <Router history={browserHistory}>
            <Route path="/" component={TodoApp}>
                <IndexRoute component={PendingTodos}/>
                <Route path="" component={PendingTodos}/>
                <Route path="completetodos" component={CompletedTodos}/>
                <Route path="addtodo" component={AddTodo}/>
                <Route path="editodo/:id" component={EditTodo}/>
                <Route path="trash" component={TrashedTodos}/>
            </Route>
        </Router>
    )
};

export default Routes;