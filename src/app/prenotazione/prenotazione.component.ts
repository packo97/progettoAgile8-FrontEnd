import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrenotazioneService } from '../services/prenotazione.service';
import * as $ from 'jquery';
import { HomeService } from '../services/home.service';
import { Paziente } from '../richiesta-prenotazione/richiesta-prenotazione.component';
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

  prenotazioni: Prenotazione[] = [];


  paziente: Paziente;

  constructor(private root: Router, private service: PrenotazioneService, private homeService: HomeService) { }

  ngOnInit() {
    this.homeService.getPaziente(sessionStorage.getItem('user')).subscribe(
      response => {
        console.log(response);
        this.paziente = response;
        this.getAllPrenotazioniByPaziente(this.paziente);
      }
    );
    
    
  }

  getAllPrenotazioniByPaziente(paziente: Paziente) {
    
    this.service.getAllPrenotazioniByPaziente(paziente).subscribe(
      response => {​​​​
        console.log(response);
        this.prenotazioni = response;
      }​​​​
    );

  }


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
