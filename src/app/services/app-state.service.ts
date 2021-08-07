import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppState } from '../interfaces/app-state';

const defaultAppState = {
  hideComplete: false
}

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  private _appState: BehaviorSubject<AppState> = new BehaviorSubject(defaultAppState)

  public readonly appState$: Observable<AppState> = this._appState.asObservable()

  toggleHideComplete() {
    const currentState = this._appState.getValue()
    this._appState.next({
      ...currentState,
      hideComplete: !currentState.hideComplete
    })
  }

}
