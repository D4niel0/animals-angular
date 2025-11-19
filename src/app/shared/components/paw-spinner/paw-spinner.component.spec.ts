import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PawSpinnerComponent } from './paw-spinner.component';

describe('PawSpinnerComponent', () => {
  let component: PawSpinnerComponent;
  let fixture: ComponentFixture<PawSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PawSpinnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PawSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
