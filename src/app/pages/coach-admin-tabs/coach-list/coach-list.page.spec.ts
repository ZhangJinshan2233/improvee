import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachListPage } from './coach-list.page';

describe('CoachListPage', () => {
  let component: CoachListPage;
  let fixture: ComponentFixture<CoachListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
