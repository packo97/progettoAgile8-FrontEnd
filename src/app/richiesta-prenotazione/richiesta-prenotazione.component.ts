import { Component, OnInit } from '@angular/core';
import { Dottore, DottoreService } from '../services/dottore.service';
import { HomeService } from '../services/home.service';
import { PrenotazioneService } from '../services/prenotazione.service';
import {Prenotazione, PrenotazioneComponent} from '../prenotazione/prenotazione.component';

export class Paziente{
  constructor(
    public id: number,
    public nome: string,
    public cognome: string,
    public codice_fiscale: string,
    public numero_telefono: string,
    public email: string,
    private password: string,
    public animale: Animale
  ){}
}

export class Animale{
  constructor(
    public id: number,
    public nome: string,
    public data_nascita: Date,
    public tipo: string,
    public genere: string,
    public peso: number,
    public altezza: number
  ){}
}


@Component({
  selector: 'app-richiesta-prenotazione',
  templateUrl: './richiesta-prenotazione.component.html',
  styleUrls: ['./richiesta-prenotazione.component.css']
})
export class RichiestaPrenotazioneComponent implements OnInit {

  problema: string;
  dottori : Dottore[] = []
  private paziente: Paziente;
  urgente: boolean;

  constructor( private service: PrenotazioneService, private dottoreService: DottoreService, private homeService: HomeService) { }

  ngOnInit() {
    this.getDottori()
    this.homeService.getPaziente(sessionStorage.getItem('user')).subscribe(
      response =>  {
        console.log(response);
        this.paziente = response;
      }
    );
  }

  richiestaPrenotazione(){
    var dottoreSelezionato = document.getElementById("selectDottori") as HTMLSelectElement;
    var json = {
      descrizione: this.problema,
      dottore: this.dottori[dottoreSelezionato.selectedIndex],
      paziente: this.paziente,
      urgente: this.urgente
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
