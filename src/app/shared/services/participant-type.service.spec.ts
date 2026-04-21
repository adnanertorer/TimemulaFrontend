/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ParticipantTypeService } from './participant-type.service';

describe('Service: ParticipantType', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParticipantTypeService]
    });
  });

  it('should ...', inject([ParticipantTypeService], (service: ParticipantTypeService) => {
    expect(service).toBeTruthy();
  }));
});
