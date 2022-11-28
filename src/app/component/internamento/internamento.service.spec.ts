import { TestBed } from '@angular/core/testing';

import { InternamentoService } from './internamento.service';

describe('InternamentoService', () => {
  let service: InternamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
