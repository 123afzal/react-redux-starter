import React, {Component} from 'react';
import { browserHistory } from "react-router";
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';
import {saveEditTodo} from '../../actions'

import './edit-todo.scss'

class EditTodo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text:'',
            date:''
        };

        this._onSubmit = this._onSubmit.bind(this);
        this._getDefaultDate = this._getDefaultDate.bind(this);
    }

    _onSubmit = (e) => {
        e.preventDefault();
        let todoText = this.refs.todoText.value;
        let dueDate = this.refs.dueDate.value;
        if(todoText.length > 0 && dueDate){
            let {todo} = this.props;
            this.refs.todoText.value = "";
            this.refs.dueDate.value = "";
            todo = {
                ...todo,
                todo: todoText,
                dueDate
            };
            this.props.actions.saveEditTodo(todo);
            browserHistory.push("/")
        }
        else{
            this.refs.todoText.focus();
        }
    };

    _getDefaultDate(date){
        var now = new Date(date * 1000);
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
        return today;
    }

    render() {
        let {todo} = this.props;
        let date = this._getDefaultDate(todo.dueDate);
        return (
            <div className="add-todo">
                <form onSubmit={this._onSubmit}>
                    <input type="text"
                           ref="todoText"
                           defaultValue={todo.todo}
                           placeholder="What do you need to do"/>

                    <div className="due-date">
                        <label htmlFor="date">Due Date :</label>
                        <input type="date" ref="dueDate" defaultValue={date}/>
                    </div>
                    <button className="button expanded">Save Todo</button>
                </form>
            </div>
        )
    }
}


/* Map state to props */
const mapStateToProps = (state) => {
    let data = state.todos;
    return {
        todo: data.todo
    };
};

/* Map Actions to Props */
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            saveEditTodo
        }, dispatch)
    };
};

/* Connect Component with Redux */
export default connect(mapStateToProps, mapDispatchToProps)(EditTodo);
