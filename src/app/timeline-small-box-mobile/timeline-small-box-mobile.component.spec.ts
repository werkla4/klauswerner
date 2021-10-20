import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineSmallBoxMobileComponent } from './timeline-small-box-mobile.component';

describe('TimelineSmallBoxMobileComponent', () => {
  let component: TimelineSmallBoxMobileComponent;
  let fixture: ComponentFixture<TimelineSmallBoxMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelineSmallBoxMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineSmallBoxMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
