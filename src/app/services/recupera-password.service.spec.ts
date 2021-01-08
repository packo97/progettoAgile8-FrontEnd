/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RecuperaPasswordService } from './recupera-password.service';

describe('Service: RecuperaPassword', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecuperaPasswordService]
    });
  });

  it('should ...', inject([RecuperaPasswordService], (service: RecuperaPasswordService) => {
    expect(service).toBeTruthy();
  }));
});
