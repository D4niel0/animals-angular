import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesButtonsComponent } from './species-buttons.component';

describe('SpeciesButtonsComponent', () => {
  let component: SpeciesButtonsComponent;
  let fixture: ComponentFixture<SpeciesButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeciesButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeciesButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
