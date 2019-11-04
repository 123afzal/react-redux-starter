import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Todo from '../todo/todo'
import { toggleTodo } from '../../actions';
import './pending-todos.scss'


class PendingTodos extends React.Component {
    constructor(props) {
        super(props);

        this._renderTodos = this._renderTodos.bind(this);
        this._handleToggle = this._handleToggle.bind(this);
        this._filteredTodos = this._filteredTodos.bind(this);
    }

    _filteredTodos(showCompleted, todos) {
        let filteredTodos = todos;

        //filtered by showCompleted
        filteredTodos = todos.filter((todo) => {
            return !todo.completed || showCompleted;
        });

        return filteredTodos;
    }

    _handleToggle(id){
        this.props.actions.toggleTodo(id)
    }

    _renderTodos(){
        let {todos, showCompleted} = this.props;
        let filterTodos = this._filteredTodos(showCompleted, todos);
        console.log("todos", todos);
        return (
            filterTodos.map((todo) => {
                return <Todo {...todo} key={todo.id} onToggle={this._handleToggle} showEdit={true}/>
            })
        )
    }
    render() {
        console.log('ad');
        return (
            <div className="todo-list">
                <h4>Pending Todos</h4>
                {this._renderTodos()}
            </div>
        )
    }
}

/* Map state to props */
const mapStateToProps = (state) => {
    let data = state.todos;
    console.log(data);
    return {
        todos: data.todos
    };
};

/* Map Actions to Props */
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            toggleTodo
        }, dispatch)
    };
};

/* Connect Component with Redux */
export default connect(mapStateToProps, mapDispatchToProps)(PendingTodos);