import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodjournalPostPage } from './foodjournal-post.page';

describe('FoodjournalPostPage', () => {
  let component: FoodjournalPostPage;
  let fixture: ComponentFixture<FoodjournalPostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodjournalPostPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodjournalPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
