import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Todo } from '../interfaces/todo';
import { LocalStorageService } from './local-storage.service';
import { List } from 'immutable';
import { v4 as uuid } from 'uuid'

@Injectable({
  providedIn: 'root'
})
export class TodosService implements OnDestroy {
  private _todos = new BehaviorSubject(List<Todo>())

  private circularSubscription!: Subscription

  public readonly todos$ = this._todos.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    const initialTodos = this.getTodosFromLocalStorage()
    const newTodos = this._todos.getValue().concat(initialTodos)
    this._todos.next(newTodos)

    this.circularSubscription = this.todos$.subscribe(todos => {
      this.localStorageService.setItem('todos', todos.toArray())
    })
  }

  ngOnDestroy() {
    this.circularSubscription.unsubscribe()
  }

  private getTodosFromLocalStorage(): List<Todo> {
    const data = this.localStorageService.getItem('todos')
    if (!data) return List()
    const todos = JSON.parse(data)
    return List(todos)
  }

  public addTodo(text: string) {
    const newTodos = this._todos.getValue().push({
      id: uuid(),
      text,
      isComplete: false
    })
    this._todos.next(newTodos)
  }

  toggleComplete(id: string) {
    const todos = this._todos.getValue()
    const index = todos.findIndex(todo => todo.id === id)
    if (index === -1) return
    const oldTodo = todos.find(todo => todo.id === id)
    if (!oldTodo) return

    const updatedTodos = todos.setIn([index, 'isComplete'], !oldTodo.isComplete)
    this._todos.next(updatedTodos)
  }

}
