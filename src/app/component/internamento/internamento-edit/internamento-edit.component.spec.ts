import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternamentoEditComponent } from './internamento-edit.component';

describe('InternamentoEditComponent', () => {
  let component: InternamentoEditComponent;
  let fixture: ComponentFixture<InternamentoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternamentoEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternamentoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
