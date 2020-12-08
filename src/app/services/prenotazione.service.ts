import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Prenotazione } from 'src/app/prenotazione/prenotazione.component'

@Injectable({
  providedIn: 'root'
})
export class PrenotazioneService {

  constructor(
    private httpClient : HttpClient
  ) { }
  
  getCodaUrgenti() {
  
    return this.httpClient.get<Prenotazione[]>("http://localhost:8080/restex/urgentiNonAccettati");
    
  }
  
  getCodaAttesa() {}
  
  getCodaAccettatti() {}
  
  }
  