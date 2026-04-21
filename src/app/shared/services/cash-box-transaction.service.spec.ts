/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CashBoxTransactionService } from './cash-box-transaction.service';

describe('Service: CashBoxTransaction', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CashBoxTransactionService]
    });
  });

  it('should ...', inject([CashBoxTransactionService], (service: CashBoxTransactionService) => {
    expect(service).toBeTruthy();
  }));
});
