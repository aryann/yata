import { TestBed } from '@angular/core/testing';

import { YataService } from './yata.service';

describe('YataService', () => {
  let service: YataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
