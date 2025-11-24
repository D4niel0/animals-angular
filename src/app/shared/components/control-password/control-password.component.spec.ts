import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPasswordComponent } from './control-password.component';

describe('ControlPasswordComponent', () => {
  let component: ControlPasswordComponent;
  let fixture: ComponentFixture<ControlPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
