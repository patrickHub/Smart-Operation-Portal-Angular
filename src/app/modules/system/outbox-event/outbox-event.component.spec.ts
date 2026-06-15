import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutboxEventComponent } from './outbox-event.component';

describe('OutboxEventComponent', () => {
  let component: OutboxEventComponent;
  let fixture: ComponentFixture<OutboxEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutboxEventComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OutboxEventComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
