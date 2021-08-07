import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from './todo';

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
export class TodosService {
  private id = 0

  private _todos: BehaviorSubject<Todo[]> = new BehaviorSubject(dummyData)

  public readonly todos: Observable<Todo[]> = this._todos.asObservable()

  addTodo(text: string) {
    console.log('add todo called')
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
