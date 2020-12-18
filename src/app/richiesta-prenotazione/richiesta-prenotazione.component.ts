import { Component, OnInit } from '@angular/core';
import { Dottore, DottoreService } from '../services/dottore.service';
import { HomeService } from '../services/home.service';
import { PrenotazioneService } from '../services/prenotazione.service';

export class Paziente{
  constructor(
    private nome: string,
    private cognome: string,
    private codice_fiscale: string,
    private numero_telefono: string,
    private email: string,
    private password: string,
    private animale: string
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

  constructor(private service: PrenotazioneService, private dottoreService: DottoreService, private homeService: HomeService) { }

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
