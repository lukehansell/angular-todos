import { TestBed } from '@angular/core/testing';
import { Todo } from '../interfaces/todo';
import { LocalStorageService } from './local-storage.service';

import { TodosService } from './todos.service';

describe('TodosService', () => {
  let service: TodosService;

  let todos: Todo[]

  let localStorageMock: LocalStorageService

  beforeEach(async () => {

    localStorageMock = jasmine.createSpyObj('LocalStorageService', ['getItem', 'setItem'])

    TestBed.configureTestingModule({
      providers: [
        { provide: LocalStorageService, useValue: localStorageMock }
      ]
    });
    service = TestBed.inject(TodosService);

    await service.todos$.subscribe(val => {
      todos = val
    })
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('on init', async () => {
    it('defaults to []', () => {
      expect(todos).toEqual([])
    })

  })

  describe('addTodo', () => {
    beforeEach(() => {
      service.addTodo('something')
    })

    it('adds "something" to the list of todos', () => {
      expect(todos).toEqual([{
        isComplete: false,
        text: 'something',
        id: 0
      }])
    })

    it('stores the value of todos in localstorage', () => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith('todos', todos)
    })
  })

  describe('toggleComplete', () => {
    beforeEach(() => {
      service.addTodo('something')
      service.toggleComplete(0)
    })

    it('marks the selected todo as complete', () => {
      expect(todos[0].isComplete).toBeTrue()
    })

    it('stores the value of todos in localstorage', () => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith('todos', todos)
    })
  })
});
