import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdiagComponent } from './editdiag.component';

describe('EditdiagComponent', () => {
  let component: EditdiagComponent;
  let fixture: ComponentFixture<EditdiagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditdiagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdiagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
