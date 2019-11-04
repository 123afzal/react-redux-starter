import React from 'react';
import uuid from 'node-uuid';
import moment from 'moment';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import { connect } from  'react-redux';
import { browserHistory } from 'react-router';
import { changeIndex } from './actions'


import './todo-app.scss';
class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items:[{name:'Home', path:'/'}, {name:'Completed', path: 'completetodos'},
                {name:'Trashed', path:'trash'}, {name:'Add/Edit', path:'addtodo'}]
        };
        this._handleAddTodo = this._handleAddTodo.bind(this);
        this._handleOnSearch = this._handleOnSearch.bind(this);
        this._handleToggle = this._handleToggle.bind(this);
        this._filteredTodos = this._filteredTodos.bind(this);
        this._renderList = this._renderList.bind(this);
    }

    _filteredTodos(showCompleted, handelText, todos) {
        let filteredTodos = todos;

        //filtered by showCompleted
        filteredTodos = todos.filter((todo) => {
            return !todo.completed || showCompleted;
        });

        //filtered by handleText
        filteredTodos = filteredTodos.filter((todo) => {
            let text = todo.todo.toLowerCase();
            console.log(text)
            return handelText.length === 0 || text.indexOf(handelText) > -1;
        });

        //filter by non-completed first
        filteredTodos.sort((a,b) => {
            if(!a.completed && b.completed){
                return -1;
            } else if(a.completed && !b.completed){
                return 1;
            } else{
                return 0;
            }
        });

        return filteredTodos;
    }

    _handleToggle(id){
        let updatedTodos = this.state.todos.map((todo) => {
            if(todo.id === id){
                todo.completed = !todo.completed;
                todo.completedAt = todo.completed ? moment().unix() : undefined
            }
            return todo
        });
        this.setState({
            todos: updatedTodos
        })
    }

    _handleAddTodo(todoText){
        this.setState({
            todos: [
                ...this.state.todos,
                {
                    id: uuid(),
                    todo: todoText,
                    completed: false,
                    createdAt: moment().unix(),
                    completedAt: undefined
                }
            ]
        })
    }

    _handleOnSearch(handelText, showCompleted){
        this.setState({
            handelText: handelText,
            showCompleted: showCompleted
        })
    }

    _renderList() {
        return(
            this.state.items.map((item, i) => {
                return <li key={i}
                           className={this.props.activeItem === i ? 'active': ''}
                           onClick={() => {
                               this.props.actions.changeIndex(i);
                               browserHistory.push(`${item.path}`)
                           }}
                >
                    {item.name}
                </li>
            })
        )
    }

    render() {
        return (
            <div className="todo-app">
                <div className="grid-x">
                    <div className="medium-6 large-4 cell" style={{margin:"0 auto"}}>
                        <div className="text-center">
                            <h1>TODO App</h1>
                        </div>
                        <div className="navigations">
                            <ul>
                                {this._renderList()}
                            </ul>
                        </div>
                        <div className="container">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        activeItem: state.todos.activeItem
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            changeIndex
        }, dispatch)
    };
}

TodoApp.propTypes = {
    children: PropTypes.object,
    actions: PropTypes.object
};
export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
