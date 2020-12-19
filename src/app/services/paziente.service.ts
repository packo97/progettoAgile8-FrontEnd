import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paziente } from '../richiesta-prenotazione/richiesta-prenotazione.component';

@Injectable({
  providedIn: 'root'
})
export class PazienteService {

  constructor(private httpClient: HttpClient) { }

  getAllPazienti(){
    return this.httpClient.get<Paziente[]>("http://localhost:8080/restex/pazienti/");
  }

  ricerca(valoreRicerca: string){
    return this.httpClient.get<Paziente[]>(`http://localhost:8080/restex/pazienti/${valoreRicerca}`);
  }
}
