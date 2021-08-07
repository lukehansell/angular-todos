import { NgIterable, Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../interfaces/todo'
@Pipe({
  name: 'filterComplete'
})
export class FilterCompletePipe implements PipeTransform {

  transform(todos: Todo[] | null, filterComplete: boolean): NgIterable<any> | null {
    if (!todos) return todos
    if (!filterComplete) return todos
    return todos.filter(todo => !todo.isComplete);
  }

}
