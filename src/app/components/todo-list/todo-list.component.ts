import { Component, Input, TemplateRef } from '@angular/core';
import { AppStateService } from 'src/app/services/app-state.service';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  @Input() noTodosTemplate: TemplateRef<any>

  constructor(public todosService: TodosService, public appStateService: AppStateService) { }

}
