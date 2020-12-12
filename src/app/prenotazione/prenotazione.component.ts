import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrenotazioneService } from '../services/prenotazione.service';
import * as $ from 'jquery';
export class Prenotazione{

  constructor(
    public id: number,
    public descrizione: string,
    public paziente: number,
    public dottore: number,
    public confermato: boolean,
    public date_visita: Date,
    public urgente: boolean
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


  refresh(prenotazione : Prenotazione){
    $(".list-group-item").each(function(i, obj) {
      $(obj).removeClass("list-group-item-info");
      $(obj).addClass("list-group-item-warning");
    });
    $("#"+prenotazione.id).removeClass("list-group-item-warning").addClass("list-group-item-info");
    
    this.service.refreshPanelDetail(prenotazione);
  }

  deletePrenotazione(prenotazione){
    this.service.deletePrenotazione(prenotazione);
  }
}
