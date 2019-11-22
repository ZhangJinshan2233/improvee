import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorRecordsPage } from './indicator-records.page';

describe('IndicatorRecordsPage', () => {
  let component: IndicatorRecordsPage;
  let fixture: ComponentFixture<IndicatorRecordsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicatorRecordsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorRecordsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
