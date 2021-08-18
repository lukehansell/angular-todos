import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodosService } from 'src/app/services/todos.service';

import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todosServiceStub

  beforeEach(async () => {
    todosServiceStub = jasmine.createSpyObj(TodosService, ['addTodo', 'toggleTodo'])

    await TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      providers: [
        { provide: TodosService, useValue: todosServiceStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
