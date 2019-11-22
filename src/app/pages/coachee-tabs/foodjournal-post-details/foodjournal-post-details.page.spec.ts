import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodjournalPostDetailsPage } from './foodjournal-post-details.page';

describe('FoodjournalPostDetailsPage', () => {
  let component: FoodjournalPostDetailsPage;
  let fixture: ComponentFixture<FoodjournalPostDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodjournalPostDetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodjournalPostDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
