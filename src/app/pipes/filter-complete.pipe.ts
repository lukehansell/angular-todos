import { NgIterable, Pipe, PipeTransform } from '@angular/core';
import { List } from 'immutable';
import { Todo } from '../interfaces/todo'
@Pipe({
  name: 'filterComplete'
})
export class FilterCompletePipe implements PipeTransform {

  transform(todos: List<Todo> | null, filterComplete: boolean): NgIterable<any> | null {
    if (!todos) return todos
    if (!filterComplete) return todos
    return todos.filter(todo => !todo.isComplete);
  }

}
