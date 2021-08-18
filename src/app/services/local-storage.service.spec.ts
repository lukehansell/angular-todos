import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  let windowMock: Window
  let localStorageMock: Storage

  beforeEach(() => {
    localStorageMock = jasmine.createSpyObj('Storage', {
      getItem: () => JSON.stringify('fake data'),
      setItem: () => { }
    })

    windowMock = <any>{
      localStorage: localStorageMock
    }

    TestBed.configureTestingModule({
      providers: [
        { provide: Window, useFactory: (() => { return windowMock }) }
      ]
    });
    TestBed.inject(Window)
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getItem', () => {
    beforeEach(() => {
      service.getItem('item')
    })

    it('fetches the item from the localstorage', () => {
      expect(localStorageMock.getItem).toHaveBeenCalledWith('item')
    })
  })
});
