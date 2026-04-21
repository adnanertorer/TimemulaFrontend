/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ArtPackageService } from './art-package.service';

describe('Service: ArtPackage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArtPackageService]
    });
  });

  it('should ...', inject([ArtPackageService], (service: ArtPackageService) => {
    expect(service).toBeTruthy();
  }));
});
