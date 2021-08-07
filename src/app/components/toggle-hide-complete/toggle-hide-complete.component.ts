import { Component } from '@angular/core';
import { AppStateService } from 'src/app/services/app-state.service';

@Component({
  selector: 'toggle-hide-complete',
  templateUrl: './toggle-hide-complete.component.html',
  styleUrls: ['./toggle-hide-complete.component.scss']
})
export class ToggleHideCompleteComponent {
  constructor(public appStateService: AppStateService) {}
}
