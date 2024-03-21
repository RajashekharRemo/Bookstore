import { TestBed } from '@angular/core/testing';

import { StoreListService } from './store-list.service';

describe('StoreListService', () => {
  let service: StoreListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
