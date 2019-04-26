import { TestBed } from '@angular/core/testing';

import { NewsDataFactoryService } from './news-data-factory.service';

describe('NewsDataFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewsDataFactoryService = TestBed.get(NewsDataFactoryService);
    expect(service).toBeTruthy();
  });
});
