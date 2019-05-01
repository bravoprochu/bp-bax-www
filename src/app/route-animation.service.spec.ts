import { TestBed } from '@angular/core/testing';

import { RouteAnimationService } from './route-animation.service';

describe('RouteAnimationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouteAnimationService = TestBed.get(RouteAnimationService);
    expect(service).toBeTruthy();
  });
});
