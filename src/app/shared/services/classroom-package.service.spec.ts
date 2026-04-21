/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClassroomPackageService } from './classroom-package.service';

describe('Service: ClassroomPackage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClassroomPackageService]
    });
  });

  it('should ...', inject([ClassroomPackageService], (service: ClassroomPackageService) => {
    expect(service).toBeTruthy();
  }));
});
