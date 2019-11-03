import React, {Component} from 'react';

import './todo-search.scss'
class TodoSearch extends Component {
    constructor(props) {
        super(props);

        this._handleChange = this._handleChange.bind(this);
    }

    _handleChange(){
        let handelText = this.refs.searchText.value;
        let showCompleted = this.refs.showCompleted.checked;

        this.props.onSearch(handelText, showCompleted);
    }

    render() {
        return (
            <div className="todo-search">
                <div>
                    <input type="search" ref="searchText" placeholder="Search todos" onChange={this._handleChange}/>
                </div>
                <div>
                    <label>
                        <input type="checkbox" ref="showCompleted" onChange={this._handleChange}/>
                        Show Complete Todos
                    </label>
                </div>
            </div>
        )
    }
}

export default TodoSearch;
