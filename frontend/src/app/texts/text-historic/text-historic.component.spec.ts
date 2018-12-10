import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextHistoricComponent } from './text-historic.component';

describe('TextHistoricComponent', () => {
  let component: TextHistoricComponent;
  let fixture: ComponentFixture<TextHistoricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextHistoricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
