import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    pending()
    // const fixture = TestBed.createComponent(AppComponent);
    // const app = fixture.componentInstance;
    // expect(app).toBeTruthy();
  });

  it(`should have as title 'todo'`, () => {
    pending()
    // const fixture = TestBed.createComponent(AppComponent);
    // const app = fixture.componentInstance;
    // expect(app.title).toEqual('todo');
  });

  it('should render title', () => {
    pending()
    // const fixture = TestBed.createComponent(AppComponent);
    // fixture.detectChanges();
    // const compiled = fixture.nativeElement;
    // expect(compiled.querySelector('header h1').textContent).toContain('Todo List');
  });
});
