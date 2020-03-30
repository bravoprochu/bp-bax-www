import { TestBed } from '@angular/core/testing';

import { MenuCommonFunctionsService } from './menu-common-functions.service';

describe('MenuCommonFunctionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuCommonFunctionsService = TestBed.get(MenuCommonFunctionsService);
    expect(service).toBeTruthy();
  });
});
