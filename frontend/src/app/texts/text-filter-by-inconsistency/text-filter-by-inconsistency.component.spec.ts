import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFilterByInconsistencyComponent } from './text-filter-by-inconsistency.component';

describe('TextFilterByInconsistencyComponent', () => {
  let component: TextFilterByInconsistencyComponent;
  let fixture: ComponentFixture<TextFilterByInconsistencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextFilterByInconsistencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextFilterByInconsistencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
