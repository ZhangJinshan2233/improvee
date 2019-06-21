import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitListItemsCreatePage } from './habit-list-items-create.page';

describe('HabitListItemsCreatePage', () => {
  let component: HabitListItemsCreatePage;
  let fixture: ComponentFixture<HabitListItemsCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabitListItemsCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitListItemsCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
