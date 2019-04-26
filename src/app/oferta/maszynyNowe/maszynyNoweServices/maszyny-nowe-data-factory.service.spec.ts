import { TestBed } from '@angular/core/testing';

import { MaszynyNoweDataFactoryService } from './maszyny-nowe-data-factory.service';

describe('MaszynyNoweDataFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaszynyNoweDataFactoryService = TestBed.get(MaszynyNoweDataFactoryService);
    expect(service).toBeTruthy();
  });
});
