import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitItemsPage } from './habit-items.page';

describe('HabitItemsPage', () => {
  let component: HabitItemsPage;
  let fixture: ComponentFixture<HabitItemsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabitItemsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
