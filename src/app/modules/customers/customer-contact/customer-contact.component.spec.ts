import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContactComponent } from './customer-contact.component';

describe('CustomerContactComponent', () => {
  let component: CustomerContactComponent;
  let fixture: ComponentFixture<CustomerContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerContactComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerContactComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
