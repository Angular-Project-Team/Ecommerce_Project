import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedPayment } from './saved-payment';

describe('SavedPayment', () => {
  let component: SavedPayment;
  let fixture: ComponentFixture<SavedPayment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedPayment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedPayment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
