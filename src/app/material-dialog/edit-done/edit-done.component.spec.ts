import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDoneComponent } from './edit-done.component';

describe('EditDoneComponent', () => {
  let component: EditDoneComponent;
  let fixture: ComponentFixture<EditDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
