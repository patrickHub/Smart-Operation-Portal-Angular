import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailLayoutComponent } from './customer-detail-layout.component';

describe('CustomerDetailLayoutComponent', () => {
  let component: CustomerDetailLayoutComponent;
  let fixture: ComponentFixture<CustomerDetailLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDetailLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerDetailLayoutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
