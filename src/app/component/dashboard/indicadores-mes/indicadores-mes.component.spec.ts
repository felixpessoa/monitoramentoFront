import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadoresMesComponent } from './indicadores-mes.component';

describe('IndicadoresMesComponent', () => {
  let component: IndicadoresMesComponent;
  let fixture: ComponentFixture<IndicadoresMesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicadoresMesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadoresMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
