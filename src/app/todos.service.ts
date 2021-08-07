import { EventEmitter, Injectable, Output } from '@angular/core';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private id = 0
  todos: Todo[] = [
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

  @Output() update = new EventEmitter() // rather than event emitter, make todos observable

  addTodo(text: string) {
    console.log('add todo called')
    this.todos.push({
      id: this.id++,
      text,
      isComplete: false
    })
    console.log('emitting update')
    this.update.emit(this.todos)
  }

  toggleComplete(id: number) {
    const todo = this.todos.find(todo => todo.id === id)
    if (todo) {
      todo.isComplete = !todo.isComplete
      console.log('emitting update')
      this.update.emit(this.todos)
    }
  }
}
