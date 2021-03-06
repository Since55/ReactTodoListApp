import React, { Component} from 'react';
import ReactDOM from 'react-dom';

import './item-add-form.css';

export default class ItemAddForm extends Component{

    state = {
        label: ''
    };

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value //e.target value gives actual form value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAdd(this.state.label);
        this.setState({
            label:''
        });
    }

    render(){

        return(
            <form className='item-add-form'
                    onSubmit={this.onSubmit}>
                <input type="text" 
                    className='form-control'
                    onChange={this.onLabelChange}
                    placeholder='What do you have to do?'
                    value={this.state.label}></input>
                <button
                  className='btn btn-outline-secondary'>
                  Add</button>
            </form>
        );
    }
}
