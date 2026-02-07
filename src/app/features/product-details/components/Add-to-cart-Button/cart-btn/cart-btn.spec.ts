import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartBtn } from './cart-btn';

describe('CartBtn', () => {
  let component: CartBtn;
  let fixture: ComponentFixture<CartBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartBtn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartBtn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
