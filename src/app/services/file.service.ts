import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Animale, Paziente } from '../richiesta-prenotazione/richiesta-prenotazione.component';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClient: HttpClient) { }

  uploadFile(fd: FormData){
    return this.httpClient.post("http://localhost:8080/restex/prescrizione",fd);
  }

  getAllPrescrizioniByAnimale(animale: Animale){
    return this.httpClient.post<any[]>("http://localhost:8080/restex/prescrizioniByAnimale",animale);
  }

  download(id: number): any {
    const httpOptions = {
      //'responseType'  : 'arraybuffer' as 'json'
       'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.httpClient.get<any>(`http://localhost:8080/restex/pdf/${id}`,httpOptions);
  }
}
