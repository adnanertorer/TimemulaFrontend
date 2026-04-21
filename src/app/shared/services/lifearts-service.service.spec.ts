/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LifeartsServiceService } from './lifearts-service.service';

describe('Service: LifeartsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LifeartsServiceService]
    });
  });

  it('should ...', inject([LifeartsServiceService], (service: LifeartsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
