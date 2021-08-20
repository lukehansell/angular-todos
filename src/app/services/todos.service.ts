import { Injectable, OnDestroy } from '@angular/core';
import { asyncScheduler, BehaviorSubject, Observable, Subscription, of } from 'rxjs';
import { catchError, throttleTime } from 'rxjs/operators';
import { Todo } from '../interfaces/todo';
import { LocalStorageService } from './local-storage.service';
import { List } from 'immutable';
import { v4 as uuid } from 'uuid'
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TodosService implements OnDestroy {
  private _todos = new BehaviorSubject(List<Todo>())

  private circularSubscription!: Subscription

  public readonly todos$ = this._todos.asObservable();

  public error: string | null = null

  constructor(private localStorageService: LocalStorageService, private http: HttpClient) {
    const initialTodos = this.getTodosFromLocalStorage()
    const newTodos = this._todos.getValue().concat(initialTodos)
    this._todos.next(newTodos)

    this.getTodos()

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

  public getTodos() {
    this.http.get<Todo[]>('http://localhost:3000/todos')
      .subscribe(todos => {
        this._todos.next(List(todos))
      })
  }

  public addTodo(text: string) {
    const tempID = `_temp_${uuid()}`
    const currentTodos = this._todos.getValue()
    const newTodo = { text, isComplete: false, id: tempID }
    const newTodos = currentTodos.concat(newTodo)
    this._todos.next(newTodos)

    this.http.post<Todo>('http://localhost:3000/todos', { text })
      .pipe(
        catchError((error: any) => {
          console.log(`Error creating todo: ${error.message}`, newTodo, error)
          const rollbackTodos = this._todos.getValue().filter(todo => todo.id !== newTodo.id)
          this._todos.next(List(rollbackTodos))
          this.error = 'Unable to add item. Please try again.'
          return of(newTodo)
        })
      )
      .subscribe(() => {})
  }

  public updateTodo(todoToUpdate: Todo) {
    const todos = this._todos.getValue()
    const originalTodo = todos.find(todo => todo.id === todoToUpdate.id) as Todo
    const updatedTodos = todos.map(this.replaceTodoIfMatching(todoToUpdate))
    this._todos.next(updatedTodos)
    this.http.put<Todo>(`http://localhost:3000/todos/${todoToUpdate.id}`, todoToUpdate)
      .pipe(
        catchError((error: any) => {
          console.log(`Error updating todo ${todoToUpdate.id}: ${error.message}`, error)
          return of(originalTodo)
        })
      )
      .subscribe(() => {})
  }

  private replaceTodoIfMatching = (updatedTodo: Todo) => (todo: Todo): Todo => todo.id === updatedTodo.id ? updatedTodo : todo

  public toggleComplete(id: string) {
    const todo = this._todos.getValue().find((todo) => todo.id === id)
    if (!todo) return
    this.updateTodo({ ...todo, isComplete: !todo.isComplete })
  }
}
