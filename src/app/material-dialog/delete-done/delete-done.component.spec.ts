import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDoneComponent } from './delete-done.component';

describe('DeleteDoneComponent', () => {
  let component: DeleteDoneComponent;
  let fixture: ComponentFixture<DeleteDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
