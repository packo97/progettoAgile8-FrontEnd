import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrenotazioneService } from '../services/prenotazione.service';

export class Prenotazione{

  constructor(
    public descrizione: string,
    public paziente: number,
    public dottore: number
    ){}

}

@Component({
  selector: 'app-prenotazione',
  templateUrl: './prenotazione.component.html',
  styleUrls: ['./prenotazione.component.css']
})
export class PrenotazioneComponent implements OnInit {

  prenotazioniUrgenti: Prenotazione[] = [];
  prenotazioniAttesa: Prenotazione[] = [];
  prenotazioniAccettate: Prenotazione[] = []

  constructor(private root: Router, private service: PrenotazioneService) { }

  ngOnInit() {
    this.getCodaUrgenti();
    this.getCodaAttesa();
  }

  getCodaUrgenti() {
    
    this.service.getCodaUrgenti().subscribe(
      response => {​​​​
      console.log(response);
      this.prenotazioniUrgenti = response;
      }​​​​
    );

  }

  getCodaAttesa() {
    this.service.getCodaAttesa().subscribe(
      response => {
        console.log(response);
        this.prenotazioniAttesa = response;
      }
    );
  }

  getCodaAccettatti() {}
}
