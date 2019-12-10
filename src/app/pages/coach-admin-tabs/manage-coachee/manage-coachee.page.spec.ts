import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCoacheePage } from './manage-coachee.page';

describe('ManageCoacheePage', () => {
  let component: ManageCoacheePage;
  let fixture: ComponentFixture<ManageCoacheePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCoacheePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCoacheePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
