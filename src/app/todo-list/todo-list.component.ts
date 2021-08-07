import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Todo } from '../todo';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {

  todos: Todo[] = []
  private _todoServiceSubscription: Subscription;

  @Input() hideComplete: boolean = true

  constructor(public todosService: TodosService) {
    this._todoServiceSubscription = todosService.todos.subscribe((todos) => {
      console.log('received update', todos)
      this.todos = todos
    })
  }

  ngOnInit() { }

  ngOnDestroy() {
    this._todoServiceSubscription.unsubscribe()
  }

  handleTodoClick(id: number) {
    console.log('todo clicked')
    this.todosService.toggleComplete(id)
  }
}
