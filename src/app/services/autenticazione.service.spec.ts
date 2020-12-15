/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AutenticazioneService } from './autenticazione.service';

describe('Service: Autenticazione', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutenticazioneService]
    });
  });

  it('should ...', inject([AutenticazioneService], (service: AutenticazioneService) => {
    expect(service).toBeTruthy();
  }));
});
