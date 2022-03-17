import { TestBed } from '@angular/core/testing';

import { PurchaseCodeService } from './purchase-code.service';

describe('PurchaseCodeService', () => {
  let service: PurchaseCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
