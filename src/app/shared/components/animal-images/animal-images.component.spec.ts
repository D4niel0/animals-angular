import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalImagesComponent } from './animal-images.component';

describe('AnimalImagesComponent', () => {
  let component: AnimalImagesComponent;
  let fixture: ComponentFixture<AnimalImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalImagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
