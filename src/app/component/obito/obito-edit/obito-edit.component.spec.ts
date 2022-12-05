import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObitoEditComponent } from './obito-edit.component';

describe('ObitoEditComponent', () => {
  let component: ObitoEditComponent;
  let fixture: ComponentFixture<ObitoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObitoEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObitoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
