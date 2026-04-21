/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomerLessonsTempService } from './customer-lessons-temp.service';

describe('Service: CustomerLessonsTemp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerLessonsTempService]
    });
  });

  it('should ...', inject([CustomerLessonsTempService], (service: CustomerLessonsTempService) => {
    expect(service).toBeTruthy();
  }));
});
