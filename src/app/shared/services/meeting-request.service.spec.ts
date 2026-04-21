/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MeetingRequestService } from './meeting-request.service';

describe('Service: MeetingRequest', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeetingRequestService]
    });
  });

  it('should ...', inject([MeetingRequestService], (service: MeetingRequestService) => {
    expect(service).toBeTruthy();
  }));
});
