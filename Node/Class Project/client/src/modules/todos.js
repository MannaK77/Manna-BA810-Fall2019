import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Todo } from '../resources/data/todo-object ';
@inject(Todo)

export class Todos {
  constructor(todo) {
    this.todo = todo;
    this.userObj = JSON.parse(sessionStorage.getItem('userObj'));
    this.statuses = ['Todo', 'In Process', 'Completed'];
    this.isCheckedCompleted = true;
  }
  newTodo() {
    this.todo.newTodo(this.userObj._id);
    this.showForm = true;
  }

  async saveTodo() {
    await this.todo.saveTodo()
  }

  Cancel() {
    this.showForm = false;
  }

  async attached() {
    await this.getTodos();
  }

  async getTodos() {
    await this.todo.getTodos(this.userObj._id);
    this.showForm = false;
  }

  async saveTodo() {
    await this.todo.saveTodo()
    this.getTodos();
  }

  editTodo(todo) {
    this.todo.selectedTodo = todo;
    this.showForm = true;
  }

  updateTodo(todo) {
    this.todo.selectedTodo = todo;
    this.saveTodo();
  }
  async deleteTodos() {
    await this.todo.deleteTodos(this.todo._id);
    this.deleteTodos();
  }


}
