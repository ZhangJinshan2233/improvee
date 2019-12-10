import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoacheeDetailPage } from './coachee-detail.page';

describe('CoacheeDetailPage', () => {
  let component: CoacheeDetailPage;
  let fixture: ComponentFixture<CoacheeDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoacheeDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoacheeDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
