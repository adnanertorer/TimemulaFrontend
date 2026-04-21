/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomerLessonsScheduleService } from './customer-lessons-schedule.service';

describe('Service: CustomerLessonsSchedule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerLessonsScheduleService]
    });
  });

  it('should ...', inject([CustomerLessonsScheduleService], (service: CustomerLessonsScheduleService) => {
    expect(service).toBeTruthy();
  }));
});
