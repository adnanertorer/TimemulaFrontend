/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EducatorDaysHoursService } from './educator-days-hours.service';

describe('Service: EducatorDaysHours', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EducatorDaysHoursService]
    });
  });

  it('should ...', inject([EducatorDaysHoursService], (service: EducatorDaysHoursService) => {
    expect(service).toBeTruthy();
  }));
});
