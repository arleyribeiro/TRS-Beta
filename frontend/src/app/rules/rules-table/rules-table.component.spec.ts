import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesTableComponent } from './rules-table.component';

describe('RulesTableComponent', () => {
  let component: RulesTableComponent;
  let fixture: ComponentFixture<RulesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RulesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
