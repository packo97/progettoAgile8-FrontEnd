import { Injectable, Output, EventEmitter} from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Prenotazione } from 'src/app/prenotazione/prenotazione.component'
import { Paziente } from '../richiesta-prenotazione/richiesta-prenotazione.component';
import { Dottore } from './dottore.service';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioneService {
  

  constructor(
    private httpClient : HttpClient
  ) { }
  

  addRichiestaPrenotazione(json){
    return this.httpClient.post<Prenotazione>("http://localhost:8080/restex/prenotazione",json);
  }

  deletePrenotazione(prenotazione){
    return this.httpClient.delete("http://localhost:8080/restex/prenotazione/"+prenotazione.id);
    
  }

  updateStato(prenotazione: Prenotazione) {
    this.httpClient.put("http://localhost:8080/restex/prenotazione/",prenotazione).subscribe();
  }

  getCodaUrgenti() {
    return this.httpClient.get<Prenotazione[]>("http://localhost:8080/restex/urgentiNonAccettati");
  }
  
  getCodaAttesa() {
    return this.httpClient.get<Prenotazione[]>("http://localhost:8080/restex/inAttesa");
  }

  getAllPrenotazioniByPaziente(paziente: Paziente) {
    return this.httpClient.post<Prenotazione[]>("http://localhost:8080/restex/prenotazioniByPaziente",paziente);
  }

  getAllPrenotazioniByDoctorAndDate(dottore: Dottore, data: Date) {
    data.setHours(data.getHours()+1);
    let json = {
      dottore: dottore,
      data: data
    }
    return this.httpClient.post<Prenotazione[]>("http://localhost:8080/restex/prenotazioniByDoctorAndDate",json);
  }

  getAllPrenotazioniByDoctor(dottore: Dottore) {//aggiustare back-end
    return this.httpClient.post<Prenotazione[]>("http://localhost:8080/restex/prenotazioniByDoctor",dottore);
  }

  getAllRichiesteByDoctor(dottore: Dottore) {
    return this.httpClient.post<Prenotazione[]>("http://localhost:8080/restex/richiesteByDoctor",dottore);
  }

  getAllUrgentiByDoctor(dottore: Dottore) {
    return this.httpClient.post<Prenotazione[]>("http://localhost:8080/restex/urgentiNonAccettatiByDoctor", dottore);
  }

  
  getCodaAccettati() {
    return this.httpClient.get<Prenotazione[]>("http://localhost:8080/restex/accettati");
  }
  
  @Output() fire: EventEmitter<any> = new EventEmitter();
  refreshPanelDetail(prenotazione: Prenotazione) {
     this.fire.emit(prenotazione);
   }

   getDetailChanged() {
     return this.fire;
   }

   @Output() firePush: EventEmitter<any> = new EventEmitter();
  refreshPrenotazione(prenotazione: Prenotazione) {
     this.firePush.emit(prenotazione);
   }

   getPrenotazioneChanged() {
    return this.firePush;
  }


}

  
  