import { TestBed } from '@angular/core/testing';

import { InvestorServicesService } from './investor-services.service';

describe('InvestorServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvestorServicesService = TestBed.get(InvestorServicesService);
    expect(service).toBeTruthy();
  });
});
