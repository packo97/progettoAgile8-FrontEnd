/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RegistrazioneService } from './registrazione.service';

describe('Service: Registrazione', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistrazioneService]
    });
  });

  it('should ...', inject([RegistrazioneService], (service: RegistrazioneService) => {
    expect(service).toBeTruthy();
  }));
});
