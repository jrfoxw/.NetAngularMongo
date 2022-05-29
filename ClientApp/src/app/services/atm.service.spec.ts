import { TestBed } from '@angular/core/testing';

import { ATMService } from './atm.service';

describe('ATMService', () => {
  let service: ATMService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ATMService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
