import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeldiagComponent } from './deldiag.component';

describe('DeldiagComponent', () => {
  let component: DeldiagComponent;
  let fixture: ComponentFixture<DeldiagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeldiagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeldiagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
