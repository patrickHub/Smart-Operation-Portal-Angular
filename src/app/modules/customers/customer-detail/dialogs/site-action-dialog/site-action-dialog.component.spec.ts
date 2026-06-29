import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteActionDialogComponent } from './site-action-dialog.component';

describe('SiteActionDialogComponent', () => {
  let component: SiteActionDialogComponent;
  let fixture: ComponentFixture<SiteActionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteActionDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SiteActionDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
