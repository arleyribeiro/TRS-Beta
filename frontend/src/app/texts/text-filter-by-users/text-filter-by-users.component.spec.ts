import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFilterByUsersComponent } from './text-filter-by-users.component';

describe('TextFilterByUsersComponent', () => {
  let component: TextFilterByUsersComponent;
  let fixture: ComponentFixture<TextFilterByUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextFilterByUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextFilterByUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
