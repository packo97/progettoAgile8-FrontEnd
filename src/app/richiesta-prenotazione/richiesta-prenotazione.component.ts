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
    public password: string,
    public animale: Animale[],
    public img: any
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
    public paziente:Paziente,
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

  constructor(private component : PrenotazioneComponent, private service: PrenotazioneService, private dottoreService: DottoreService, private homeService: HomeService) { }

  ngOnInit() {
    this.getDottori()
    this.homeService.getPaziente(sessionStorage.getItem('user')).subscribe(
      response =>  {

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
    this.service.addRichiestaPrenotazione(json).subscribe(
      response =>{
        
        this.service.refreshPrenotazione(response);
        //this.component.refreshPrenotazioni();
        //this.component.prenotazioni.push(new Prenotazione(1,this.problema,this.paziente, this.dottori[dottoreSelezionato.selectedIndex],false,null,this.urgente));
      }
    );

    
  }

  getDottori(){
    this.dottoreService.getDottori().subscribe(
      response => {

        this.dottori = response;
      }
    );
  }

}
