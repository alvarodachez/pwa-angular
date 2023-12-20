/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FakeShopService } from './fake-shop.service';

describe('Service: FakeShop', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FakeShopService]
    });
  });

  it('should ...', inject([FakeShopService], (service: FakeShopService) => {
    expect(service).toBeTruthy();
  }));
});
