import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paziente } from '../richiesta-prenotazione/richiesta-prenotazione.component';

@Injectable({
  providedIn: 'root'
})
export class PazienteService {

  constructor(private httpClient: HttpClient) { }


  updateImg(uploadImageData: FormData){
    return this.httpClient.post('http://localhost:8080/restex/uploadImagePaziente', uploadImageData, { observe: 'response' });
  }


  updatePassword(paziente: Paziente, passwordVecchia: string, passwordNuova: string){
    let json = {
      paziente: paziente,
      passwordVecchia: passwordVecchia,
      passwordNuova: passwordNuova
    };
    return this.httpClient.put("http://localhost:8080/restex/updatePasswordPaziente", json);
  }

  updatePaziente(paziente: Paziente){
    return this.httpClient.put("http://localhost:8080/restex/paziente",paziente);
  }

  getPaziente(email: string){
    return this.httpClient.get<Paziente>(`http://localhost:8080/restex/paziente/${email}`);
  }

  getAllPazienti(){
    return this.httpClient.get<Paziente[]>("http://localhost:8080/restex/pazienti/");
  }

  ricerca(valoreRicerca: string){
    return this.httpClient.get<Paziente[]>(`http://localhost:8080/restex/pazienti/${valoreRicerca}`);
  }
}
