import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryAttemptComponent } from './delivery-attempt.component';

describe('DeliveryAttemptComponent', () => {
  let component: DeliveryAttemptComponent;
  let fixture: ComponentFixture<DeliveryAttemptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryAttemptComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeliveryAttemptComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
