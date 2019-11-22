import { TestBed } from '@angular/core/testing';

import { ChallengeCategoryService } from './challenge-category.service';

describe('ChallengeCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChallengeCategoryService = TestBed.get(ChallengeCategoryService);
    expect(service).toBeTruthy();
  });
});
