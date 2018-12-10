import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextSharedWithMeComponent } from './text-shared-with-me.component';

describe('TextSharedWithMeComponent', () => {
  let component: TextSharedWithMeComponent;
  let fixture: ComponentFixture<TextSharedWithMeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextSharedWithMeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextSharedWithMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
