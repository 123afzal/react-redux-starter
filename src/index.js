import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes'

import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
);


ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    document.getElementById('root'));