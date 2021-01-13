import { TestBed } from '@angular/core/testing';

import { MetaUpdaterService } from './meta-updater.service';

describe('MetaUpdaterServiceService', () => {
  let service: MetaUpdaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetaUpdaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
