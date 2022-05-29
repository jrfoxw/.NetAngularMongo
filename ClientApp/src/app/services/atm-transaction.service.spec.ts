import { TestBed } from '@angular/core/testing';

import { AtmTransactionService } from './atm-transaction.service';

describe('AtmTransactionService', () => {
  let service: AtmTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtmTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
