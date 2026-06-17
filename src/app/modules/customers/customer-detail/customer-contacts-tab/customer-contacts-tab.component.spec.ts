import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContactsTabComponent } from './customer-contacts-tab.component';

describe('CustomerContactsTabComponent', () => {
  let component: CustomerContactsTabComponent;
  let fixture: ComponentFixture<CustomerContactsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerContactsTabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerContactsTabComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
