import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineSmallBoxComponent } from './timeline-small-box.component';

describe('TimelineSmallBoxComponent', () => {
  let component: TimelineSmallBoxComponent;
  let fixture: ComponentFixture<TimelineSmallBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelineSmallBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineSmallBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
