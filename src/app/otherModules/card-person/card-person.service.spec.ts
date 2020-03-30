import { TestBed } from '@angular/core/testing';

import { CardPersonService } from './card-person.service';

describe('CardPersonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CardPersonService = TestBed.get(CardPersonService);
    expect(service).toBeTruthy();
  });
});
