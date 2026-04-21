/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SearchResourceService } from './search-resource.service';

describe('Service: SearchResource', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchResourceService]
    });
  });

  it('should ...', inject([SearchResourceService], (service: SearchResourceService) => {
    expect(service).toBeTruthy();
  }));
});
