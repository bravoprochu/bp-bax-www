import { TestBed } from '@angular/core/testing';

import { MaszynyNoweService } from './maszyny-nowe.service';

describe('MaszynyNoweService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaszynyNoweService = TestBed.get(MaszynyNoweService);
    expect(service).toBeTruthy();
  });
});
