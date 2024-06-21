import { TestBed } from '@angular/core/testing';

import { NgxCheckoutBnplService } from './ngx-checkout-bnpl.service';

describe('NgxCheckoutBnplService', () => {
  let service: NgxCheckoutBnplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxCheckoutBnplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
