import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrenotazioneService } from '../services/prenotazione.service';
import { DottoreService, Dottore } from '../services/dottore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private root: Router, private service: PrenotazioneService, private dottoreService: DottoreService) { }

  problema: string;
  dottori : Dottore[] = []

  ngOnInit() {
    this.getDottori()
  }

  richiestaPrenotazione(){
    var dottoreSelezionato = document.getElementById("selectDottori") as HTMLSelectElement;
   
    var json = {
      descrizione: this.problema,
      dottore_id: this.dottori[dottoreSelezionato.selectedIndex],
      paziente_id: 1
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

  getCodaUrgenti() {
    this.service.getCodaUrgenti();

  }

  getCodaAttesa() {}

  getCodaAccettatti() {}

}
