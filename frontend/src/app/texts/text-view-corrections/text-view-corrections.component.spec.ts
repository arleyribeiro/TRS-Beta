import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextViewCorrectionsComponent } from './text-view-corrections.component';

describe('TextViewCorrectionsComponent', () => {
  let component: TextViewCorrectionsComponent;
  let fixture: ComponentFixture<TextViewCorrectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextViewCorrectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextViewCorrectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
