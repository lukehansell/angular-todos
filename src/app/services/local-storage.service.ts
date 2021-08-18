import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private window: Window) {}

  getItem(key: string) {
    const data = this.window.localStorage.getItem(key)
    return data
  }

  setItem(key: string, value: any) {
    this.window.localStorage.setItem(key, JSON.stringify(value))
  }
}
