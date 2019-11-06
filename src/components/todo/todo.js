import React, {Component} from 'react';
import moment from 'moment';


import './todo.scss'
import {bindActionCreators} from "redux";
import {editTodo, deleteTodo, restoreTodo} from "../../actions";
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
        return message + ' ' + moment.unix(timeStrap).format('MMM Do YYYY @ h:mm a') + '\n' +
            'Due date' + '' + moment.unix(dueDate).format('MMM Do YYYY @ h:mm a')
    };

    render() {
        let {id, todo, completed, showEdit, showDelete} = this.props;
        let todoClassName = completed ? "todo todo-completed" : "todo";
        return (
            <div className={todoClassName} >
                {
                    showDelete && <div id="toggle-todo" onClick={
                        ()=>{this.props.onToggle(id)}
                    }>
                        <input type="checkbox" checked={completed} onChange={() => {completed = !completed}}/>
                    </div>
                }
                <div>
                    <p className="todotext">{todo}</p>
                    <p className="sub-text pre-line">{this._renderDates()}</p>
                    <div className="render-controls">
                        {
                            showEdit ?
                            <button className="button edit-btn"
                                    id="edit-btn"
                                    onClick={()=> {
                                        this.props.actions.editTodo(id);
                                        browserHistory.push(`editodo/${id}`)
                                    }}>
                                Edit
                            </button>
                                : null
                        }
                        {
                            showDelete ?
                            <button className="button del-btn"
                                    id="del-btn"
                                    onClick={() => {
                                        this.props.actions.deleteTodo(id)
                                    }}
                            >
                                Delete
                            </button>
                                :
                            <button className="button edit-btn"
                                    id="restore-btn"
                                    onClick={() => {
                                        this.props.actions.restoreTodo(id)
                                    }}
                            >
                                Restore
                            </button>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            editTodo,
            deleteTodo,
            restoreTodo
        }, dispatch)
    };
};

/* Connect Component with Redux */
export default connect(null, mapDispatchToProps)(Todo);