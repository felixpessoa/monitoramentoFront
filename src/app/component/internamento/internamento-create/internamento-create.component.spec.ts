import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternamentoCreateComponent } from './internamento-create.component';

describe('InternamentoCreateComponent', () => {
  let component: InternamentoCreateComponent;
  let fixture: ComponentFixture<InternamentoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternamentoCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternamentoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
