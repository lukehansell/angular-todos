import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../interfaces/todo';
import { LocalStorageService } from './local-storage.service';

const dummyData = [
  {
    id: -1,
    text: 'completed',
    isComplete: true
  },
  {
    id: -2,
    text: 'not completed',
    isComplete: false
  }
]

@Injectable({
  providedIn: 'root'
})
export class TodosService implements OnDestroy {
  private id = 0

  private _todos: BehaviorSubject<Todo[]>

  private circularSubscription

  public readonly todos$: Observable<Todo[]>

  private getTodosFromLocalStorage(localStorageService: LocalStorageService): Todo[] {
    const data = localStorageService.getItem('todos')
    if (!data) return []
    return JSON.parse(data)
  }

  constructor(localStorageService: LocalStorageService) {
    const initialTodos = this.getTodosFromLocalStorage(localStorageService)
    this._todos = new BehaviorSubject(initialTodos)
    this.todos$ = this._todos.asObservable()

    this.circularSubscription = this.todos$.subscribe(todos => {
      localStorageService.setItem('todos', todos)
    })
  }

  ngOnDestroy() {
    this.circularSubscription.unsubscribe()
  }

  addTodo(text: string) {
    this._todos.next(
      [
        ...this._todos.getValue(),
        {
          id: this.id++,
          text,
          isComplete: false
        }
      ]
    )
  }

  toggleComplete(id: number) {
    const todos = this._todos.getValue()
    const index = todos.findIndex(todo => todo.id === id)
    const todo = todos[index]
    const updatedTodos = [
      ...todos.slice(0, index),
      {
        ...todo,
        isComplete: !todo.isComplete
      },
      ...todos.slice(index + 1)
    ]
    this._todos.next(updatedTodos)
  }
}
