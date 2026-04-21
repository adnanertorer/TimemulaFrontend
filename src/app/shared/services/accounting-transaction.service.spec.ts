/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AccountingTransactionService } from './accounting-transaction.service';

describe('Service: AccountingTransaction', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountingTransactionService]
    });
  });

  it('should ...', inject([AccountingTransactionService], (service: AccountingTransactionService) => {
    expect(service).toBeTruthy();
  }));
});
