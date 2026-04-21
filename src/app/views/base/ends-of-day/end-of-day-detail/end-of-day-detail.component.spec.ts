import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndOfDayDetailComponent } from './end-of-day-detail.component';

describe('EndOfDayDetailComponent', () => {
  let component: EndOfDayDetailComponent;
  let fixture: ComponentFixture<EndOfDayDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndOfDayDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndOfDayDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
