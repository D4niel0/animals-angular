import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheltersAdminTableComponent } from './shelters-admin-table.component';

describe('SheltersAdminTableComponent', () => {
  let component: SheltersAdminTableComponent;
  let fixture: ComponentFixture<SheltersAdminTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SheltersAdminTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheltersAdminTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
