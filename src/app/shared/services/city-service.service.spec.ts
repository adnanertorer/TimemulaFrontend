/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CityServiceService } from './city-service.service';

describe('Service: CityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CityServiceService]
    });
  });

  it('should ...', inject([CityServiceService], (service: CityServiceService) => {
    expect(service).toBeTruthy();
  }));
});
