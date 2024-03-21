import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCardContainerComponent } from './display-card-container.component';

describe('DisplayCardContainerComponent', () => {
  let component: DisplayCardContainerComponent;
  let fixture: ComponentFixture<DisplayCardContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayCardContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayCardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
