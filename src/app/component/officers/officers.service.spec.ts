import { TestBed } from '@angular/core/testing';

import { OfficersService } from './officers.service';

describe('OfficersService', () => {
  let service: OfficersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
