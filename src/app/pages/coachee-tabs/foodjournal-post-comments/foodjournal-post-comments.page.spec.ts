import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodjournalPostCommentsPage } from './foodjournal-post-comments.page';

describe('FoodjournalPostCommentsPage', () => {
  let component: FoodjournalPostCommentsPage;
  let fixture: ComponentFixture<FoodjournalPostCommentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodjournalPostCommentsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodjournalPostCommentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
