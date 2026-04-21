/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CashboxService } from './cashbox.service';

describe('Service: Cashbox', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CashboxService]
    });
  });

  it('should ...', inject([CashboxService], (service: CashboxService) => {
    expect(service).toBeTruthy();
  }));
});
