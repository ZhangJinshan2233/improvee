import { TestBed } from '@angular/core/testing';

import { HabitlistRecordService } from './habitlist-record.service';

describe('HabitlistRecordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HabitlistRecordService = TestBed.get(HabitlistRecordService);
    expect(service).toBeTruthy();
  });
});
