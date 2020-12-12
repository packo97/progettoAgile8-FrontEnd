import { Component, OnInit } from '@angular/core';
import { Dottore, DottoreService } from '../services/dottore.service';
import { PrenotazioneService } from '../services/prenotazione.service';

@Component({
  selector: 'app-richiesta-prenotazione',
  templateUrl: './richiesta-prenotazione.component.html',
  styleUrls: ['./richiesta-prenotazione.component.scss']
})
export class RichiestaPrenotazioneComponent implements OnInit {

  problema: string;
  dottori : Dottore[] = []


  constructor(private service: PrenotazioneService, private dottoreService: DottoreService) { }

  ngOnInit() {
    this.getDottori()
  }

  richiestaPrenotazione(){
    var dottoreSelezionato = document.getElementById("selectDottori") as HTMLSelectElement;
   
    var json = {
      descrizione: this.problema,
      dottore: this.dottori[dottoreSelezionato.selectedIndex],
      //paziente
    }
    this.service.addRichiestaPrenotazione(json)
    
  }

  getDottori(){
    this.dottoreService.getDottori().subscribe(
      response => {
        console.log("sono qui")
        console.log(response);
        this.dottori = response;
      }
    );
  }

}
