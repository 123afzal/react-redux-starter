import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Todo from '../todo/todo'
import { toggleTodo } from '../../actions';
import '../pending-todos/pending-todos.scss'


class CompletedTodos extends React.Component {
    constructor(props) {
        super(props);

        this._renderTodos = this._renderTodos.bind(this);
        this._handleToggle = this._handleToggle.bind(this);
        this._filteredTodos = this._filteredTodos.bind(this);
    }

    _filteredTodos(todos) {
        return todos.filter(todo => todo.completed);
    }

    _handleToggle(id){
        this.props.actions.toggleTodo(id)
    }

    _renderTodos(){
        let {todos} = this.props;
        let filterTodos = this._filteredTodos(todos);
        console.log("filterTodos", filterTodos);
        return (
            filterTodos.map((todo) => {
                return <Todo {...todo} key={todo.id} onToggle={this._handleToggle} showEdit={false}/>
            })
        )
    }
    render() {
        console.log('ad');
        return (
            <div className="todo-list">
                <h4>Completed Todos</h4>
                {this._renderTodos()}
            </div>
        )
    }
}

/* Map state to props */
const mapStateToProps = (state) => {
    let data = state.todos;
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
export default connect(mapStateToProps, mapDispatchToProps)(CompletedTodos);