import { TestBed } from '@angular/core/testing';

import { SvgCommonFunctionsService } from './svg-common-functions.service';

describe('SvgCommonFunctionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SvgCommonFunctionsService = TestBed.get(SvgCommonFunctionsService);
    expect(service).toBeTruthy();
  });
});
