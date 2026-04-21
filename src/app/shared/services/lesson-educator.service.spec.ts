/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LessonEducatorService } from './lesson-educator.service';

describe('Service: LessonEducator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LessonEducatorService]
    });
  });

  it('should ...', inject([LessonEducatorService], (service: LessonEducatorService) => {
    expect(service).toBeTruthy();
  }));
});
