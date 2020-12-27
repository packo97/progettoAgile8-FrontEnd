import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrenotazioneService } from '../services/prenotazione.service';
import * as $ from 'jquery';
import { HomeService } from '../services/home.service';
import { Paziente } from '../richiesta-prenotazione/richiesta-prenotazione.component';
import { Dottore } from '../services/dottore.service';
export class Prenotazione{

  constructor(
    public id: number,
    public descrizione: string,
    public paziente: any,
    public dottore: any,
    public confermato: boolean,
    public data_visita: any,
    public urgente: boolean
    ){}

}

@Component({
  selector: 'app-prenotazione',
  templateUrl: './prenotazione.component.html',
  styleUrls: ['./prenotazione.component.css']
})
export class PrenotazioneComponent implements OnInit {

  public prenotazioni: Prenotazione[] = [];


  paziente: Paziente;

  dottore: Dottore;

  data: Date;


  constructor(private root: Router, private service: PrenotazioneService, private homeService: HomeService) {
   }

  ngOnInit() {

    this.data = new Date();

    if(sessionStorage.getItem('profile')=="paziente")
      this.homeService.getPaziente(sessionStorage.getItem('user')).subscribe(
        response => {
          console.log(response);
          this.paziente = response;
          this.getAllPrenotazioniByPaziente(this.paziente);
        }
      );
    else if(sessionStorage.getItem('profile')=="dottore")
      this.homeService.getDottore(sessionStorage.getItem('user')).subscribe(
        response => {
          console.log(response);
          this.dottore = response;
          this.getAllPrenotazioniByDoctor(this.dottore);
        }
      );
    
    
  }

  refreshPrenotazioni(){
    if(this.paziente!=null){
      this.getAllPrenotazioniByPaziente(this.paziente)
    }
    else if(this.dottore!=null){
      this.getAllPrenotazioniByDoctor(this.dottore);
    }
  }

  getAllPrenotazioniByPaziente(paziente: Paziente) {
    
    this.service.getAllPrenotazioniByPaziente(paziente).subscribe(
      response => {​​​​
        console.log(response);
        this.prenotazioni = response;
      }​​​​
    );

  }

  getAllPrenotazioniByDoctor(dottore: Dottore) {
    
    this.service.getAllPrenotazioniByDoctor(dottore,this.data).subscribe(
      response => {​​​​
        console.log(response);
        this.prenotazioni = response;
      }​​​​
    );

  }


  refresh(prenotazione : Prenotazione){
    let lista = this.prenotazioni;
    $(".list-group-item").each(function(i, obj) {
      $(obj).removeClass("list-group-item-info");
      if(lista[i].confermato)
        $(obj).addClass("list-group-item-success");
      else
        $(obj).addClass("list-group-item-warning");
    });
    
    $("#"+prenotazione.id).removeClass("list-group-item-warning").addClass("list-group-item-info");
    
    this.service.refreshPanelDetail(prenotazione);
  }

  deletePrenotazione(prenotazione){
    this.service.deletePrenotazione(prenotazione);
  }
}
