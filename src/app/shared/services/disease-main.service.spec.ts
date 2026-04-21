/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DiseaseMainService } from './disease-main.service';

describe('Service: DiseaseMain', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiseaseMainService]
    });
  });

  it('should ...', inject([DiseaseMainService], (service: DiseaseMainService) => {
    expect(service).toBeTruthy();
  }));
});
