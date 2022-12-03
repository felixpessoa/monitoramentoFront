import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaReadComponent } from './alta-read.component';

describe('AltaReadComponent', () => {
  let component: AltaReadComponent;
  let fixture: ComponentFixture<AltaReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
