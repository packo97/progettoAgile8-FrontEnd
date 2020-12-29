import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Animale, Paziente } from '../richiesta-prenotazione/richiesta-prenotazione.component';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClient: HttpClient) { }

  uploadPrescrizione(fd: FormData){
    return this.httpClient.post("http://localhost:8080/restex/prescrizione",fd);
  }

  uploadRicevute(fd: FormData){
    return this.httpClient.post("http://localhost:8080/restex/ricevuta",fd);
  }

  getAllPrescrizioniByAnimale(animale: Animale){
    return this.httpClient.post<any[]>("http://localhost:8080/restex/prescrizioniByAnimale",animale);
  }

  getAllRicevuteByAnimale(animale: Animale){
    return this.httpClient.post<any[]>("http://localhost:8080/restex/ricevuteByAnimale",animale);
  }

  downloadPrescrizione(id: number): any {
    const httpOptions = {
       'responseType'  : 'blob' as 'json'    
    };
    return this.httpClient.get<any>(`http://localhost:8080/restex/prescrizionePDF/${id}`,httpOptions);
  }

  downloadRicevuta(id: number): any {
    const httpOptions = {
       'responseType'  : 'blob' as 'json'    
    };
    return this.httpClient.get<any>(`http://localhost:8080/restex/ricevutaPDF/${id}`,httpOptions);
  }
}
