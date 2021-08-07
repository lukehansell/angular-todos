import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleHideCompleteComponent } from './toggle-hide-complete.component';

describe('ToggleHideCompleteComponent', () => {
  let component: ToggleHideCompleteComponent;
  let fixture: ComponentFixture<ToggleHideCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToggleHideCompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleHideCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
