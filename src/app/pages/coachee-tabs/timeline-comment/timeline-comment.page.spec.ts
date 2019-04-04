import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineCommentPage } from './timeline-comment.page';

describe('TimelineCommentPage', () => {
  let component: TimelineCommentPage;
  let fixture: ComponentFixture<TimelineCommentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineCommentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineCommentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
