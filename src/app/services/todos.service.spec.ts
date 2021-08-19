import { TestBed } from '@angular/core/testing';
import { List } from 'immutable';
import { Todo } from '../interfaces/todo';
import { LocalStorageService } from './local-storage.service';

import { TodosService } from './todos.service';

describe('TodosService', () => {
  let service: TodosService;

  let todos: List<Todo>

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
      expect(todos.toArray()).toEqual([])
    })
  })

  describe('addTodo', () => {
    beforeEach(() => {
      service.addTodo('something')
    })

    it('adds "something" to the list of todos', () => {
      expect(todos.toArray()).toEqual([{
        isComplete: false,
        text: 'something',
        id: jasmine.stringMatching(/.+/)
      }])
    })

    it('stores the value of todos in localstorage', () => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith('todos', todos.toArray())
    })
  })

  describe('toggleComplete', () => {
    beforeEach(() => {
      service.addTodo('something')

      service.toggleComplete(todos.first()?.id!)
    })

    it('marks the selected todo as complete', () => {
      expect(todos.first()!.isComplete).toBeTrue()
    })

    it('stores the value of todos in localstorage', () => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith('todos', todos.toArray())
    })
  })
});
