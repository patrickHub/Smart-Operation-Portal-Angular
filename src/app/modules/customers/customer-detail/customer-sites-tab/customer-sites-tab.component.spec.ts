import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSitesTabComponent } from './customer-Sites-tab.component';

describe('CustomerAssetsTabComponent', () => {
  let component: CustomerSitesTabComponent;
  let fixture: ComponentFixture<CustomerSitesTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerSitesTabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerSitesTabComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
