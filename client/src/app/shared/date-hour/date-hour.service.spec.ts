import { TestBed } from '@angular/core/testing';

import { DateHourService } from './date-hour.service';

describe('DateHourService', () => {
  let service: DateHourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateHourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
