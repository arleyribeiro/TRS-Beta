import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextProcessedComponent } from './text-processed.component';

describe('TextProcessedComponent', () => {
  let component: TextProcessedComponent;
  let fixture: ComponentFixture<TextProcessedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextProcessedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextProcessedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
