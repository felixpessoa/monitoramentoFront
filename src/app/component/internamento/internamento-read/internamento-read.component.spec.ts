import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternamentoReadComponent } from './internamento-read.component';

describe('InternamentoReadComponent', () => {
  let component: InternamentoReadComponent;
  let fixture: ComponentFixture<InternamentoReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternamentoReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternamentoReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
