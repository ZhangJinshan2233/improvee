import { TestBed } from '@angular/core/testing';

import { IndicatorRecordService } from './indicator-record.service';

describe('IndicatorRecordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IndicatorRecordService = TestBed.get(IndicatorRecordService);
    expect(service).toBeTruthy();
  });
});
