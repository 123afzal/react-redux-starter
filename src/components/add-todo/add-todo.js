import React, {Component} from 'react';

import './add-todo.scss'
import { addTodo } from '../../actions';
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router'

class AddTodo extends Component {
    constructor(props) {
        super(props);

        this._onSubmit = this._onSubmit.bind(this);
    }

    _onSubmit = (e) => {
        e.preventDefault();

        let todoText = this.refs.todo.value;

        if(todoText.length > 0){
            this.refs.todo.value = "";
            this.props.actions.addTodo(todoText);
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
