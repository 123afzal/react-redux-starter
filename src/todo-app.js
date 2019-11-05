import React from 'react';
import uuid from 'node-uuid';
import moment from 'moment';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import { connect } from  'react-redux';
import { browserHistory } from 'react-router';
import { changeIndex } from './actions'


import './todo-app.scss';
class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items:[{name:'Home', path:'/'}, {name:'Completed', path: 'completetodos'},
                {name:'Trashed', path:'trash'}, {name:'Add/Edit', path:'addtodo'}]
        };
        this._renderList = this._renderList.bind(this);
    }

    _renderList() {
        return this.state.items.map((item, i) =>
                 <li key={i}
                           className={'item ' + (this.props.activeItem === i ? 'active': '')}
                           onClick={() => {
                               this.props.actions.changeIndex(i);
                               browserHistory.push(`${item.path}`)
                           }}
                >
                    {item.name}
                </li>
            );
    }

    render() {
        return (
            <div className="todo-app">
                <div className="grid-x">
                    <div className="medium-6 large-4 cell" style={{margin:"0 auto"}}>
                        <div className="text-center">
                            <h1>TODO App</h1>
                        </div>
                        <div className="navigations">
                            <ul className="navigation-items">
                                {this._renderList()}
                            </ul>
                        </div>
                        <div className="container">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        activeItem: state.todos.activeItem
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            changeIndex
        }, dispatch)
    };
}

TodoApp.propTypes = {
    children: PropTypes.object,
    actions: PropTypes.object
};
export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
