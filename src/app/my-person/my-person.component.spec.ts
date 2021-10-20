import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPersonComponent } from './my-person.component';

describe('MyPersonComponent', () => {
  let component: MyPersonComponent;
  let fixture: ComponentFixture<MyPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
