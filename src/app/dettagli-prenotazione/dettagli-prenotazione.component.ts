import { Component, OnInit} from '@angular/core';
import { Prenotazione } from '../prenotazione/prenotazione.component';
import { PrenotazioneService } from '../services/prenotazione.service';

@Component({
  selector: 'app-dettagli-prenotazione',
  templateUrl: './dettagli-prenotazione.component.html',
  styleUrls: ['./dettagli-prenotazione.component.css']
})
export class DettagliPrenotazioneComponent implements OnInit {

  prenotazione: Prenotazione;

  constructor(private service: PrenotazioneService) { }

  ngOnInit() {
    let subscription = this.service.getDetailChanged().subscribe(
      item => {
        this.prenotazione=item;
        this.prenotazione.data_visita=this.convertiData(this.prenotazione.data_visita)
      }
    );
  }

  convertiData(data){
    console.log(data);
    if(data==null || data=="La data della visita non è assegnata")
      return "La data della visita non è assegnata";
  
    var str = data.toString(); 
    var giorni = str.split("T",2); 
    if(giorni.length==2)
    { 
      var dataCorretta = giorni[0].toString().split("-"); 
      var oreMinuti = giorni[1].toString().split(":",2);
      var s =dataCorretta[2]+"-"+dataCorretta[1]+"-"+dataCorretta[0]+"  "+oreMinuti[0]+":"+oreMinuti[1];
      return s;
    }
    return data;

  }

}
