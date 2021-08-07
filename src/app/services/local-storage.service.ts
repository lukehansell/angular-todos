import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  getItem(key: string) {
    const data = window.localStorage.getItem(key)
    if (!data) return data
    return JSON.parse(data)
  }

  setItem(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
}
