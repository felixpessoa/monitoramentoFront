import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObitoReadComponent } from './obito-read.component';

describe('ObitoReadComponent', () => {
  let component: ObitoReadComponent;
  let fixture: ComponentFixture<ObitoReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObitoReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObitoReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
