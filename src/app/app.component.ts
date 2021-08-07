import { Component } from '@angular/core';
import { TodosService } from './services/todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [TodosService]
})
export class AppComponent {

  hideComplete = false

  toggleHideComplete() {
    this.hideComplete = !this.hideComplete
  }

}
