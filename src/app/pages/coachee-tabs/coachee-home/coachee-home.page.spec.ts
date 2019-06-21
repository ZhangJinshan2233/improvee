import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoacheeHomePage } from './coachee-home.page';

describe('CoacheeHomePage', () => {
  let component: CoacheeHomePage;
  let fixture: ComponentFixture<CoacheeHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoacheeHomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoacheeHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
