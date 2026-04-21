/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ActualCustomerLessonService } from './actual-customer-lesson.service';

describe('Service: ActualCustomerLesson', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActualCustomerLessonService]
    });
  });

  it('should ...', inject([ActualCustomerLessonService], (service: ActualCustomerLessonService) => {
    expect(service).toBeTruthy();
  }));
});
