/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SegretariaService } from './segretaria.service';

describe('Service: Segretaria', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SegretariaService]
    });
  });

  it('should ...', inject([SegretariaService], (service: SegretariaService) => {
    expect(service).toBeTruthy();
  }));
});
