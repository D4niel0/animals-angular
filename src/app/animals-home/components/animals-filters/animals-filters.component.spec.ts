import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalsFiltersComponent } from './animals-filters.component';

describe('AnimalsFiltersComponent', () => {
  let component: AnimalsFiltersComponent;
  let fixture: ComponentFixture<AnimalsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalsFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
