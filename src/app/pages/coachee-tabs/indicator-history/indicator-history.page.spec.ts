import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorHistoryPage } from './indicator-history.page';

describe('IndicatorHistoryPage', () => {
  let component: IndicatorHistoryPage;
  let fixture: ComponentFixture<IndicatorHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicatorHistoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
