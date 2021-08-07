import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'toggle-hide-complete',
  templateUrl: './toggle-hide-complete.component.html',
  styleUrls: ['./toggle-hide-complete.component.scss']
})
export class ToggleHideCompleteComponent {

  @Input() hideComplete: boolean = false

  @Output() toggle = new EventEmitter()

  changeHandler() {
    console.log('clicked')
    this.toggle.emit()
  }

}
