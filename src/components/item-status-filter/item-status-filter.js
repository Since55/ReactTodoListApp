import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component{

  state = {
    status: {
      active: 'btn btn-outline-secondary',
      all: 'btn btn-info',
      done: 'btn btn-outline-secondary'
    }
  }

  changeStatus = (btn, other1, other2) => {
    
    this.props.onFilter(btn);
    
    this.setState( ({status}) => {
      return{
        status: {
          [btn]: 'btn btn-info',
          [other1]: 'btn btn-outline-secondary',
          [other2]: 'btn btn-outline-secondary'
        }
      }
    });
  };

  render(){

    const {active, all, done} = this.state.status;

    return (
      <div className="btn-group">
        <button type="button"
                className={all}
                onClick={ () => {this.changeStatus('all', 'active', 'done')} }>All</button>
        <button type="button"
                className={active}
                onClick={ () => {this.changeStatus('active', 'all', 'done')} }>
                  Active</button>
        <button type="button"
                className={done}
                onClick={ () => {this.changeStatus('done', 'all', 'active')} }>Done</button>
      </div>
    );
  }
}