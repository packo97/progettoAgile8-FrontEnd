/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MessaggiService } from './messaggi.service';

describe('Service: Messaggi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessaggiService]
    });
  });

  it('should ...', inject([MessaggiService], (service: MessaggiService) => {
    expect(service).toBeTruthy();
  }));
});
