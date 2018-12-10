import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextSharedDialogComponent } from './text-shared-dialog.component';

describe('TextSharedDialogComponent', () => {
  let component: TextSharedDialogComponent;
  let fixture: ComponentFixture<TextSharedDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextSharedDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextSharedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
