import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachesPage } from './coaches.page';

describe('CoachesPage', () => {
  let component: CoachesPage;
  let fixture: ComponentFixture<CoachesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
