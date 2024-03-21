import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycartContainerComponent } from './mycart-container.component';

describe('MycartContainerComponent', () => {
  let component: MycartContainerComponent;
  let fixture: ComponentFixture<MycartContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MycartContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MycartContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
