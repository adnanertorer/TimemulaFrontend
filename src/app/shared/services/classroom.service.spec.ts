/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClassroomService } from './classroom.service';

describe('Service: Classroom', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClassroomService]
    });
  });

  it('should ...', inject([ClassroomService], (service: ClassroomService) => {
    expect(service).toBeTruthy();
  }));
});
