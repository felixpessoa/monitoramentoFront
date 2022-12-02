import { TestBed } from '@angular/core/testing';

import { AltaService } from './alta.service';

describe('AltaService', () => {
  let service: AltaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AltaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
