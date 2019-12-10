import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitlistPage } from './habitlist.page';

describe('HabitlistPage', () => {
  let component: HabitlistPage;
  let fixture: ComponentFixture<HabitlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabitlistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
