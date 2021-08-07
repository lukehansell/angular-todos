import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { AddTodoFormComponent } from './components/add-todo-form/add-todo-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodosService } from './services/todos.service';
import { TodoListItemComponent } from './components/todo-list-item/todo-list-item.component';
import { FilterCompletePipe } from './pipes/filter-complete.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    AddTodoFormComponent,
    TodoListItemComponent,
    FilterCompletePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [TodosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
