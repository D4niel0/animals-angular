import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalContactFormComponent } from './animal-contact-form.component';

describe('AnimalContactFormComponent', () => {
  let component: AnimalContactFormComponent;
  let fixture: ComponentFixture<AnimalContactFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalContactFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
