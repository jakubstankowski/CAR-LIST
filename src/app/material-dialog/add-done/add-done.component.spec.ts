import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDoneComponent } from './add-done.component';

describe('AddDoneComponent', () => {
  let component: AddDoneComponent;
  let fixture: ComponentFixture<AddDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
