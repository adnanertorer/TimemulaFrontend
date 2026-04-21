/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomerInstallmentService } from './customer-installment.service';

describe('Service: CustomerInstallment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerInstallmentService]
    });
  });

  it('should ...', inject([CustomerInstallmentService], (service: CustomerInstallmentService) => {
    expect(service).toBeTruthy();
  }));
});
