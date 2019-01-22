import { TestBed } from '@angular/core/testing';

import { PantoneToHexService } from './pantone-to-hex.service';

describe('PantoneToHexService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PantoneToHexService = TestBed.get(PantoneToHexService);
    expect(service).toBeTruthy();
  });
});
