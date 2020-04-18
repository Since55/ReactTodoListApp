import React, {Component} from 'react';

import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import TodoList from '../todo-list/todo-list';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class extends Component {

  maxId = 100;

    state = {
      todoData:[
      this.createTodoItem('Drink a Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
      filter: ''
    };

    searchFilter = (value) => {
      this.setState( () =>{
        return{
          filter: value.toLowerCase()
        };
      });
    };

    createTodoItem(label) {
      return{
        label,
        important: false,
        done:false,
        id: this.maxId++
      }
    };

    deleteItem = (id) => {
      
      this.setState(({todoData}) => {

        const idx = todoData.findIndex((el) => el.id === id);
        console.log(idx);

        const newArray = [
          ...todoData.slice(0, idx),
          ...todoData.slice(idx + 1)
        ];

        return {
          todoData: newArray
        };
      })
    };

    addItem = (text) => {
      const newItem = this.createTodoItem(text);
      //adding element
      this.setState( ({todoData}) => {
        const newArr = [
          ...todoData, newItem
        ]; 

        return{
          todoData: newArr
        };

      });

    };

    toggleProperty(arr, id, propName){
        const idx = arr.findIndex((el) => el.id === id);

        const oldItem = arr[idx];
        const newItem = {...oldItem, 
          [propName]: !oldItem[propName]};

          return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
          ];
    }

    onToggleImportant = (id) => {
      this.setState( ({todoData}) => {
        return{
          todoData: this.toggleProperty(todoData, id, 'important')
        };
      })
    };

    onToggleDone = (id) => {
      this.setState( ({todoData}) => {
        return{
          todoData: this.toggleProperty(todoData, id, 'done')
        };
      });
    };

    render(){
      const {todoData, filter} = this.state;
      const toDisplay = todoData.filter( (el) => el.label
                        .toLowerCase().includes(filter));

      const doneCount = todoData.filter( (el) => el.done).length;
      const todoCount = 
              todoData.length - doneCount;

      return (
        <div className="todo-app">
          <AppHeader toDo={todoCount} done={doneCount} />
          <div className="top-panel d-flex">
            <SearchPanel 
            onSearch={this.searchFilter}
            />
            <ItemStatusFilter />

          </div>
    
          <TodoList 
          todos={toDisplay} 
          onDeleted = {this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
          />
          <ItemAddForm onAdd = {this.addItem}/>
        </div>
      );
  };
}