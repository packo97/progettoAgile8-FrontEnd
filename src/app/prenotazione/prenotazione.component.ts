import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrenotazioneService } from '../services/prenotazione.service';

export class Prenotazione{

  constructor(
    public descrizione: string
    
    ){}

}

@Component({
  selector: 'app-prenotazione',
  templateUrl: './prenotazione.component.html',
  styleUrls: ['./prenotazione.component.css']
})
export class PrenotazioneComponent implements OnInit {

  private prenotazioniUrgenti: Prenotazione[]
  constructor(private root: Router, private service: PrenotazioneService) { }

  ngOnInit() {
  }

  getCodaUrgenti() {
    
    this.service.getCodaUrgenti().subscribe(
      response => {​​​​
      console.log(response)
      this.prenotazioniUrgenti = response;
      }​​​​
      )

  }

  getCodaAttesa() {}

  getCodaAccettatti() {}
}
