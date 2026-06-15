import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkorderComponent } from './workorder.component';

describe('WorkorderComponent', () => {
  let component: WorkorderComponent;
  let fixture: ComponentFixture<WorkorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkorderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkorderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
