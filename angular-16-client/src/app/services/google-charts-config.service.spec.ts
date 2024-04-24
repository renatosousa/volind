import { TestBed } from '@angular/core/testing';

import { GoogleChartsConfigService } from './google-charts-config.service';

describe('GoogleChartsConfigService', () => {
  let service: GoogleChartsConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleChartsConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
