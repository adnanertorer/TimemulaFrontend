/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomerLessonService } from './customer-lesson.service';

describe('Service: CustomerLesson', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerLessonService]
    });
  });

  it('should ...', inject([CustomerLessonService], (service: CustomerLessonService) => {
    expect(service).toBeTruthy();
  }));
});
