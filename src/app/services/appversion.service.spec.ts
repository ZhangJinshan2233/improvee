import { TestBed } from '@angular/core/testing';

import { AppversionService } from './appversion.service';

describe('AppversionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppversionService = TestBed.get(AppversionService);
    expect(service).toBeTruthy();
  });
});
