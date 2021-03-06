import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { AddTodoFormComponent } from './components/add-todo-form/add-todo-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoListItemComponent } from './components/todo-list-item/todo-list-item.component';
import { FilterCompletePipe } from './pipes/filter-complete.pipe';
import { ToggleHideCompleteComponent } from './components/toggle-hide-complete/toggle-hide-complete.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    AddTodoFormComponent,
    TodoListItemComponent,
    FilterCompletePipe,
    ToggleHideCompleteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: Window, useValue: window }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
