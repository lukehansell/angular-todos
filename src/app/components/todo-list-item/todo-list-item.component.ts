import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss'],
  providers: [TodosService]
})
export class TodoListItemComponent {

  @Input() text!: string
  @Input() id!: number
  @Input() isComplete!: boolean

  @Output() todoClick = new EventEmitter()

  onClick() {
    this.todoClick.emit()
  }
}
