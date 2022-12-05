import { TestBed } from '@angular/core/testing';

import { ObitoService } from './obito.service';

describe('ObitoService', () => {
  let service: ObitoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObitoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
