/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ParentTypeService } from './parent-type.service';

describe('Service: ParentType', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParentTypeService]
    });
  });

  it('should ...', inject([ParentTypeService], (service: ParentTypeService) => {
    expect(service).toBeTruthy();
  }));
});
