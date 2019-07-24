import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoacheeInfoPage } from './coachee-info.page';

describe('CoacheeInfoPage', () => {
  let component: CoacheeInfoPage;
  let fixture: ComponentFixture<CoacheeInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoacheeInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoacheeInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
