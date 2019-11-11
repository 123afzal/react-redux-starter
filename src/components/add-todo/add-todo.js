import React, {Component} from 'react';
import { browserHistory } from "react-router";
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';

import './add-todo.scss'
import { addTodo } from '../../actions';

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
            this.props.addTodo({todoText, dueDate})
            // this.props.actions.addTodo({todoText, dueDate});
            browserHistory.push("/")
        }
        else{
            this.refs.todo.focus();
        }
    };
    render() {

        return (
            <div className="add-todo">
                <form onSubmit={this._onSubmit} id="addTodoForm">
                    <input type="text" ref="todo" name="newtodo"
                           placeholder="What do you need to do" id="newtodo"/>

                    <div className="due-date">
                        <label htmlFor="date">Due Date :</label>
                        <input type="date" ref="duedate" id="newdate"  name="newdate"/>
                    </div>
                    <button className="button expanded">Add Todo</button>
                </form>
            </div>
        )
    }
}


/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
    return {
        addTodo: (obj) => {
            dispatch(addTodo(obj))
        }
    }
}
// const mapDispatchToProps = (dispatch) => {
//     return {
//         actions: bindActionCreators({
//             addTodo
//         }, dispatch)
//     };
// };

export default connect(null, mapDispatchToProps)(AddTodo);
export {AddTodo as ComponentAddTodo};
