import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheltersAdminComponent } from './shelters-admin.component';

describe('SheltersAdminComponent', () => {
  let component: SheltersAdminComponent;
  let fixture: ComponentFixture<SheltersAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SheltersAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheltersAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
