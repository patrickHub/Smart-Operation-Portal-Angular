import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSiteComponent } from './customer-site.component';

describe('CustomerSiteComponent', () => {
  let component: CustomerSiteComponent;
  let fixture: ComponentFixture<CustomerSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerSiteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerSiteComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
