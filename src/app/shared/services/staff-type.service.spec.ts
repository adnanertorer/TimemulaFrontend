/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StaffTypeService } from './staff-type.service';

describe('Service: StaffType', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaffTypeService]
    });
  });

  it('should ...', inject([StaffTypeService], (service: StaffTypeService) => {
    expect(service).toBeTruthy();
  }));
});
