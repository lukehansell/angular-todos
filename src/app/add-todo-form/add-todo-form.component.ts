import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { TodosService } from '../todos.service';

@Component({
  selector: 'app-add-todo-form',
  templateUrl: './add-todo-form.component.html',
  styleUrls: ['./add-todo-form.component.scss']
})
export class AddTodoFormComponent {
  textControl = new FormControl('')

  constructor(private todoService: TodosService) {}

  onSubmit() {
    console.log('adding todo')
    this.todoService.addTodo(this.textControl.value)
    this.textControl.setValue('')
  }
}
