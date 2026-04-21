/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SubServiceService } from './sub-service.service';

describe('Service: SubService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubServiceService]
    });
  });

  it('should ...', inject([SubServiceService], (service: SubServiceService) => {
    expect(service).toBeTruthy();
  }));
});
