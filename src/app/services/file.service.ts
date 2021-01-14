import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Esame, Prescrizione, Ricevuta } from '../cartella-clinica/cartella-clinica.component';
import { Animale, Paziente } from '../richiesta-prenotazione/richiesta-prenotazione.component';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClient: HttpClient) { }

  uploadPrescrizione(fd: FormData){
    return this.httpClient.post<Prescrizione>("http://localhost:8080/restex/prescrizione",fd);
  }

  uploadRicevute(fd: FormData){
    return this.httpClient.post<Ricevuta>("http://localhost:8080/restex/ricevuta",fd);
  }

  uploadEsami(fd: FormData){
    return this.httpClient.post<Esame>("http://localhost:8080/restex/esame",fd);
  }

  getAllPrescrizioniByAnimale(animale: Animale){
    return this.httpClient.post<any[]>("http://localhost:8080/restex/prescrizioniByAnimale",animale);
  }

  getAllRicevuteByAnimale(animale: Animale){
    return this.httpClient.post<any[]>("http://localhost:8080/restex/ricevuteByAnimale",animale);
  }

  getAllEsamiByAnimale(animale: Animale){
    return this.httpClient.post<any[]>("http://localhost:8080/restex/esamiByAnimale",animale);
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

  downloadEsame(id: number): any {
    const httpOptions = {
       'responseType'  : 'blob' as 'json'    
    };
    return this.httpClient.get<any>(`http://localhost:8080/restex/esamePDF/${id}`,httpOptions);
  }

  creaRicevuta(dottore, paziente, lista_item, importo_pagato){
    let json = {
      dottore: dottore,
      paziente: paziente,
      lista_item_ricevuta: lista_item,
      importo_pagato: importo_pagato
    }

    const httpOptions = {
      'responseType'  : 'blob' as 'json'    
    };

    return this.httpClient.post<any>("http://localhost:8080/restex/creaRicevuta",json, httpOptions);
  }

  creaPrescrizione(dottore, paziente, lista_item, animale){
    let json = {
      dottore: dottore,
      paziente: paziente,
      lista_item_prescrizione: lista_item,
      animale: animale
    }

    const httpOptions = {
      'responseType'  : 'blob' as 'json'    
    };

    return this.httpClient.post<any>("http://localhost:8080/restex/creaPrescrizione",json, httpOptions);
  }
}
