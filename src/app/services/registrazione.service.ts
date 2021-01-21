import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paziente } from '../richiesta-prenotazione/richiesta-prenotazione.component';
import { Dottore, Segretaria } from './dottore.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrazioneService {

  constructor(
    private httpClient : HttpClient
  ) { }
  
  registrazionePaziente(json){
    return this.httpClient.post<Paziente>("http://localhost:8080/restex/paziente",json);
  }
  
  registrazioneDottore(json){
    return this.httpClient.post<Dottore>("http://localhost:8080/restex/dottore",json); 
  }

  registrazioneSegretaria(json){
    return this.httpClient.post<Segretaria>("http://localhost:8080/restex/segretaria",json);  
  }

}
