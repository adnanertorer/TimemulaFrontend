/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SubServiceTeacherService } from './sub-service-teacher.service';

describe('Service: SubServiceTeacher', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubServiceTeacherService]
    });
  });

  it('should ...', inject([SubServiceTeacherService], (service: SubServiceTeacherService) => {
    expect(service).toBeTruthy();
  }));
});
