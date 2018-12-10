import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextHistoricFormComponent } from './text-historic-form.component';

describe('TextHistoricFormComponent', () => {
  let component: TextHistoricFormComponent;
  let fixture: ComponentFixture<TextHistoricFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextHistoricFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextHistoricFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
