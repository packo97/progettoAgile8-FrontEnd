/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AnimaleService } from './animale.service';

describe('Service: Animale', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnimaleService]
    });
  });

  it('should ...', inject([AnimaleService], (service: AnimaleService) => {
    expect(service).toBeTruthy();
  }));
});
