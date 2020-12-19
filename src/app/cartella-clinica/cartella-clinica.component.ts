import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Paziente } from '../richiesta-prenotazione/richiesta-prenotazione.component';
import { AnimaleService } from '../services/animale.service';
import { PazienteService } from '../services/paziente.service';

@Component({
  selector: 'app-cartella-clinica',
  templateUrl: './cartella-clinica.component.html',
  styleUrls: ['./cartella-clinica.component.css']
})
export class CartellaClinicaComponent implements OnInit {

  valoreRicerca: string;

  pazienti: Paziente[];

  pazienteSelezionato: Paziente;

  nome: string;
  data_nascita: Date;
  genere: string;
  tipo: string;
  altezza: number;
  peso: number;


  constructor(private pazienteService: PazienteService, private animaleService: AnimaleService, private messageService: MessageService) { }

  ngOnInit() {}

  ricerca(){
    this.pazienteService.ricerca(this.valoreRicerca).subscribe(
      response => {
        console.log(this.valoreRicerca);
        console.log(response);
        this.pazienti = response;
      }
    );
  }

  selezionato(paziente: Paziente){
    this.pazienteSelezionato = paziente;
    this.animaleService.getAnimali(this.pazienteSelezionato).subscribe(
      response => {
        console.log(response);
        this.nome = response[0].nome;
      }
    );
  }


  salva(){

    let json = {
      nome: this.nome,
      data_nascita: this.data_nascita,
      genere: this.genere,
      tipo: this.tipo,
      peso: this.peso,
      altezza: this.altezza,
      paziente: this.pazienteSelezionato
    }

    this.animaleService.salva(json).subscribe(
      response => {
        console.log(response);
      }
    );

    this.messageService.add({key: 'saved', severity:'success', summary: 'Saved', detail: 'Cartella clinica salvata'});
  }

}
