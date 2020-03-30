import { TestBed, async, inject } from '@angular/core/testing';

import { ResolveAnimationIsDoneGuard } from './resolve-animation-is-done.guard';

describe('ResolveAnimationIsDoneGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResolveAnimationIsDoneGuard]
    });
  });

  it('should ...', inject([ResolveAnimationIsDoneGuard], (guard: ResolveAnimationIsDoneGuard) => {
    expect(guard).toBeTruthy();
  }));
});
