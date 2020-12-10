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
  

  addRichiestaPrenotazione(json){
    this.httpClient.post("http://localhost:8080/restex/prenotazione",json).subscribe(
      response => console.log(response)
    );
  }


  getCodaUrgenti() {
    return this.httpClient.get<Prenotazione[]>("http://localhost:8080/restex/urgentiNonAccettati");
  }
  
  getCodaAttesa() {
    return this.httpClient.get<Prenotazione[]>("http://localhost:8080/restex/inAttesa");
  }
  
  getCodaAccettatti() {}
  
  }
  