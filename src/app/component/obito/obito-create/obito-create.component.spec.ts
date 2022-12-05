import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObitoCreateComponent } from './obito-create.component';

describe('ObitoCreateComponent', () => {
  let component: ObitoCreateComponent;
  let fixture: ComponentFixture<ObitoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObitoCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObitoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
