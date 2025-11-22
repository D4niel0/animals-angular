import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheltersCardsComponent } from './shelters-cards.component';

describe('SheltersCardsComponent', () => {
  let component: SheltersCardsComponent;
  let fixture: ComponentFixture<SheltersCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SheltersCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheltersCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
