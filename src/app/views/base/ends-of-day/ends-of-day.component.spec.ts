import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndsOfDayComponent } from './ends-of-day.component';

describe('EndsOfDayComponent', () => {
  let component: EndsOfDayComponent;
  let fixture: ComponentFixture<EndsOfDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndsOfDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndsOfDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
