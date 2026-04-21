/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EducatorCostService } from './educator-cost.service';

describe('Service: EducatorCost', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EducatorCostService]
    });
  });

  it('should ...', inject([EducatorCostService], (service: EducatorCostService) => {
    expect(service).toBeTruthy();
  }));
});
