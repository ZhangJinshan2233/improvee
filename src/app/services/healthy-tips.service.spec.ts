import { TestBed } from '@angular/core/testing';

import { HealthyTipsService } from './healthy-tips.service';

describe('HealthyTipsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HealthyTipsService = TestBed.get(HealthyTipsService);
    expect(service).toBeTruthy();
  });
});
