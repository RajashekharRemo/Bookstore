import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSignUpContainerComponent } from './login-sign-up-container.component';

describe('LoginSignUpContainerComponent', () => {
  let component: LoginSignUpContainerComponent;
  let fixture: ComponentFixture<LoginSignUpContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginSignUpContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSignUpContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
