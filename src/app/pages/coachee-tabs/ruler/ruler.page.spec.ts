import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RulerPage } from './ruler.page';

describe('RulerPage', () => {
  let component: RulerPage;
  let fixture: ComponentFixture<RulerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RulerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RulerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
