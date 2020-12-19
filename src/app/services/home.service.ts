import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paziente } from '../richiesta-prenotazione/richiesta-prenotazione.component';
import { Dottore, Segretaria } from './dottore.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient: HttpClient) { }

  getPaziente(email: string){
    return this.httpClient.get<Paziente>(`http://localhost:8080/restex/paziente/${email}`);
  }

  getDottore(email: string){
    return this.httpClient.get<Dottore>(`http://localhost:8080/restex/dottore/${email}`);
  }

  getSegretaria(email: string){
    return this.httpClient.get<Segretaria>(`http://localhost:8080/restex/segretaria/${email}`);
  }
}
