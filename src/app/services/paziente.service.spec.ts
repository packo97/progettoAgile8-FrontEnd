/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PazienteService } from './paziente.service';

describe('Service: Paziente', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PazienteService]
    });
  });

  it('should ...', inject([PazienteService], (service: PazienteService) => {
    expect(service).toBeTruthy();
  }));
});
