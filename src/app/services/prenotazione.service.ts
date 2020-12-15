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
    alert(JSON.stringify(json))
    this.httpClient.post("http://localhost:8080/restex/prenotazione",json).subscribe(
      response => console.log(response)
    );
  }

  deletePrenotazione(prenotazione){
    alert(prenotazione);
    this.httpClient.delete("http://localhost:8080/restex/prenotazione/"+prenotazione.id).subscribe(
      response => {
        console.log(response);
      }
    );
    
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

  getAllPrenotazioniByDoctor(dottore: Dottore) {
    return this.httpClient.post<Prenotazione[]>("http://localhost:8080/restex/prenotazioniByDoctor",dottore);
  }

  getAllRichiesteByDoctor(dottore: Dottore) {
    return this.httpClient.post<Prenotazione[]>("http://localhost:8080/restex/richiesteByDoctor",dottore);
  }
  
  getCodaAccettati() {
    return this.httpClient.get<Prenotazione[]>("http://localhost:8080/restex/accettati");
  }
  
  @Output() fire: EventEmitter<any> = new EventEmitter();
  refreshPanelDetail(prenotazione: Prenotazione) {
    console.log('change started'); 
     this.fire.emit(prenotazione);
   }

   getDetailChanged() {
     return this.fire;
   }


}

  
  