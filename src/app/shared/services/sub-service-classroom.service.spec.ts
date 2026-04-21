/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SubServiceClassroomService } from './sub-service-classroom.service';

describe('Service: SubServiceClassroom', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubServiceClassroomService]
    });
  });

  it('should ...', inject([SubServiceClassroomService], (service: SubServiceClassroomService) => {
    expect(service).toBeTruthy();
  }));
});
