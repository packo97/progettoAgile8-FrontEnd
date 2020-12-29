import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Animale, Paziente } from '../richiesta-prenotazione/richiesta-prenotazione.component';

@Injectable({
  providedIn: 'root'
})
export class AnimaleService {

  constructor(private httpClient: HttpClient) { }

  salva(json: any){
    return this.httpClient.post("http://localhost:8080/restex/animale", json);
  }

  getAnimali(paziente: Paziente){
    return this.httpClient.post<Animale[]>("http://localhost:8080/restex/animaleByPaziente",paziente);
  }
}
