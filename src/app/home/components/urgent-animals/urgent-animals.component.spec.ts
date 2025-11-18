import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrgentAnimalsComponent } from './urgent-animals.component';

describe('UrgentAnimalsComponent', () => {
  let component: UrgentAnimalsComponent;
  let fixture: ComponentFixture<UrgentAnimalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UrgentAnimalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrgentAnimalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
