import React, {Component} from 'react';

import './add-todo.scss'
import { addTodo } from '../../actions';
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';

class AddTodo extends Component {
    constructor(props) {
        super(props);

        this._onSubmit = this._onSubmit.bind(this);
    }

    _onSubmit = (e) => {
        e.preventDefault();

        let todoText = this.refs.todo.value;
        let dueDate = this.refs.duedate.value;
        if(todoText.length > 0 && dueDate){
            this.refs.todo.value = "";
            this.refs.duedate.value = "";
            this.props.actions.addTodo({todoText, dueDate});
        }
        else{
            this.refs.todo.focus();
        }
    };
    render() {

        return (
            <div className="add-todo">
                <form onSubmit={this._onSubmit}>
                    <input type="text" ref="todo" placeholder="What do you need to do"/>

                    <div className="due-date">
                        <label htmlFor="date">Due Date :</label>
                        <input type="date" ref="duedate"/>
                    </div>
                    <button className="button expanded">Add Todo</button>
                </form>
            </div>
        )
    }
}


/* Map Actions to Props */
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            addTodo
        }, dispatch)
    };
};

export default connect(null, mapDispatchToProps)(AddTodo);
