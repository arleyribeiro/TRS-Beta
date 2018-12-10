import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextProcessedFrontComponent } from './text-processed-front.component';

describe('TextProcessedFrontComponent', () => {
  let component: TextProcessedFrontComponent;
  let fixture: ComponentFixture<TextProcessedFrontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextProcessedFrontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextProcessedFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
