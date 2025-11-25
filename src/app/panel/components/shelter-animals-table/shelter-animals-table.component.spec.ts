import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterAnimalsTableComponent } from './shelter-animals-table.component';

describe('ShelterAnimalsTableComponent', () => {
  let component: ShelterAnimalsTableComponent;
  let fixture: ComponentFixture<ShelterAnimalsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShelterAnimalsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShelterAnimalsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
