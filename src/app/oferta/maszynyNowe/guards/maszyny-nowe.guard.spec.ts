import { TestBed, async, inject } from '@angular/core/testing';

import { MaszynyNoweGuard } from './maszyny-nowe.guard';

describe('MaszynyNoweGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaszynyNoweGuard]
    });
  });

  it('should ...', inject([MaszynyNoweGuard], (guard: MaszynyNoweGuard) => {
    expect(guard).toBeTruthy();
  }));
});
