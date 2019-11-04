import React, {Component} from 'react';
import moment from 'moment';


import './todo.scss'
class Todo extends Component {
    constructor(props) {
        super(props);

        this._renderDates = this._renderDates.bind(this);
        // this._onEditTodo = this._onEditTodo.bind(this);
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
                    {/*<button className="button edit-btn"*/}
                    {/*        onClick={this._onEditTodo}*/}
                    {/*        >*/}
                    {/*    Edit*/}
                    {/*</button>*/}
                </div>
            </div>
        )
    }
}

export default Todo;