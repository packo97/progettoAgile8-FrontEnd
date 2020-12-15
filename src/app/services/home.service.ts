import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paziente } from '../richiesta-prenotazione/richiesta-prenotazione.component';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

constructor(private httpClient: HttpClient) { }

getPaziente(email: string){
  return this.httpClient.get<Paziente>(`http://localhost:8080/restex/paziente/${email}`);
}

}
