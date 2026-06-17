import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInfoTabComponent } from './customer-info-tab.component';

describe('CustomerInfoTabComponent', () => {
  let component: CustomerInfoTabComponent;
  let fixture: ComponentFixture<CustomerInfoTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerInfoTabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerInfoTabComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
