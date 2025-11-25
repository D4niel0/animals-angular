import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterAnimalsTableMobileComponent } from './shelter-animals-table-mobile.component';

describe('ShelterAnimalsTableMobileComponent', () => {
  let component: ShelterAnimalsTableMobileComponent;
  let fixture: ComponentFixture<ShelterAnimalsTableMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShelterAnimalsTableMobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShelterAnimalsTableMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
