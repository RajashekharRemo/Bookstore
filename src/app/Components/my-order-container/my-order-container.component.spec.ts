import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOrderContainerComponent } from './my-order-container.component';

describe('MyOrderContainerComponent', () => {
  let component: MyOrderContainerComponent;
  let fixture: ComponentFixture<MyOrderContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyOrderContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOrderContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
