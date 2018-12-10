import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextDialogComponent } from './text-dialog.component';

describe('TextDialogComponent', () => {
  let component: TextDialogComponent;
  let fixture: ComponentFixture<TextDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
