import React, {Component} from 'react';
import moment from 'moment';


import './todo.scss'
import {bindActionCreators} from "redux";
import {editTodo} from "../../actions";
import {connect} from "react-redux";
import {browserHistory} from 'react-router'
class Todo extends Component {
    constructor(props) {
        super(props);

        this._renderDates = this._renderDates.bind(this);
    }

    _renderDates = () => {
        let {completed, createdAt, completedAt, dueDate} = this.props;

        let message = "Created at";
        let timeStrap = createdAt;

        if(completed){
            message = "Completed at";
            timeStrap = completedAt
        }
        return message + ' ' + moment.unix(timeStrap).format('MMM Do YYYY @ h:mm a') + 'Due date' + ' ' + moment.unix(dueDate).format('MMM Do YYYY @ h:mm a');
    };

    render() {
        let {id, todo, completed} = this.props;
        let todoClassName = completed ? "todo todo-completed" : "todo";
        return (
            <div className={todoClassName} onClick={
                ()=>{this.props.onToggle(id)}
            }>
                <div>
                    <input type="checkbox" checked={completed} onChange={() => {completed = !completed}}/>
                </div>
                <div>
                    <p>{todo}</p>
                    <p className="sub-text pre-line">{this._renderDates()}</p>
                    <button className="button edit-btn"
                            onClick={()=> {
                                this.props.actions.editTodo(id);
                                browserHistory.push(`editodo/${id}`)
                            }}
                            >
                        Edit
                    </button>
                </div>
            </div>
        )
    }
}

/* Map state to props */
// const mapStateToProps = (state) => {
//     let data = state.todos;
//     return {
//         todos: data.todos
//     };
// };

/* Map Actions to Props */
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            editTodo
        }, dispatch)
    };
};

/* Connect Component with Redux */
export default connect(null, mapDispatchToProps)(Todo);