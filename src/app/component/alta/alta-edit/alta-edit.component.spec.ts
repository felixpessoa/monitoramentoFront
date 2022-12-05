import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaEditComponent } from './alta-edit.component';

describe('AltaEditComponent', () => {
  let component: AltaEditComponent;
  let fixture: ComponentFixture<AltaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
