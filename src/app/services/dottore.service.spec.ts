/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DottoreService } from './dottore.service';

describe('Service: Dottore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DottoreService]
    });
  });

  it('should ...', inject([DottoreService], (service: DottoreService) => {
    expect(service).toBeTruthy();
  }));
});
