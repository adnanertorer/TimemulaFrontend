/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DeptCollectionService } from './dept-collection.service';

describe('Service: DeptCollection', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeptCollectionService]
    });
  });

  it('should ...', inject([DeptCollectionService], (service: DeptCollectionService) => {
    expect(service).toBeTruthy();
  }));
});
