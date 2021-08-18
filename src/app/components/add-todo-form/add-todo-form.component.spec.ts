import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodosService } from 'src/app/services/todos.service';

import { AddTodoFormComponent } from './add-todo-form.component';

describe('AddTodoFormComponent', () => {
  let component: AddTodoFormComponent;
  let fixture: ComponentFixture<AddTodoFormComponent>;
  let todosServiceStub: TodosService

  beforeEach(async () => {
    todosServiceStub = jasmine.createSpyObj(TodosService, ['addTodo', 'toggleTodo'])

    await TestBed.configureTestingModule({
      declarations: [AddTodoFormComponent],
      providers: [
        { provide: TodosService, useValue: todosServiceStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
