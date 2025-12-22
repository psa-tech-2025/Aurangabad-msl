import { TestBed } from '@angular/core/testing';

import { GpContentService } from './gp-content.service';

describe('GpContentService', () => {
  let service: GpContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GpContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
