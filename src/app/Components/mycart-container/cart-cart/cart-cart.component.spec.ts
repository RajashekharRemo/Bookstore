import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCartComponent } from './cart-cart.component';

describe('CartCartComponent', () => {
  let component: CartCartComponent;
  let fixture: ComponentFixture<CartCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
