import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitListItemsPage } from './habit-list-items.page';

describe('HabitListItemsPage', () => {
  let component: HabitListItemsPage;
  let fixture: ComponentFixture<HabitListItemsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabitListItemsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitListItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
