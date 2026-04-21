/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SalaryTypeService } from './salary-type.service';

describe('Service: SalaryType', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalaryTypeService]
    });
  });

  it('should ...', inject([SalaryTypeService], (service: SalaryTypeService) => {
    expect(service).toBeTruthy();
  }));
});
