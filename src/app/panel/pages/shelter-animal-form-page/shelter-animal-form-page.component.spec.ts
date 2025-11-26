import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterAnimalFormPageComponent } from './shelter-animal-form-page.component';

describe('ShelterAnimalFormPageComponent', () => {
  let component: ShelterAnimalFormPageComponent;
  let fixture: ComponentFixture<ShelterAnimalFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShelterAnimalFormPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShelterAnimalFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
