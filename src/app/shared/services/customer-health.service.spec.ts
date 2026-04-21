/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomerHealthService } from './customer-health.service';

describe('Service: CustomerHealth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerHealthService]
    });
  });

  it('should ...', inject([CustomerHealthService], (service: CustomerHealthService) => {
    expect(service).toBeTruthy();
  }));
});
