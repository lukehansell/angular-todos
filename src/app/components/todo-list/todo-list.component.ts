import { Component } from '@angular/core';
import { AppStateService } from 'src/app/services/app-state.service';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  constructor(public todosService: TodosService, public appStateService: AppStateService) { }
}
