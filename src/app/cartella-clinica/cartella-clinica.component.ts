import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';
import { Animale, Paziente } from '../richiesta-prenotazione/richiesta-prenotazione.component';
import { AnimaleService } from '../services/animale.service';
import { Dottore } from '../services/dottore.service';
import { FileService } from '../services/file.service';
import { HomeService } from '../services/home.service';
import { PazienteService } from '../services/paziente.service';



export class Prescrizione{
  constructor(
    public id: number,
    public dottore: Dottore,
    public animale: Animale,
    public content: any
  ){}
}

@Component({
  selector: 'app-cartella-clinica',
  templateUrl: './cartella-clinica.component.html',
  styleUrls: ['./cartella-clinica.component.css']
})
export class CartellaClinicaComponent implements OnInit {

  valoreRicerca: string;

  pazienti: Paziente[];

  pazienteSelezionato: Paziente;

  dottore: Dottore;

  prescrizioni: Prescrizione[] = [];

  whoIsLogged: string;

 // uploadedFiles: any[] = [];

  constructor(private homeService: HomeService, private pazienteService: PazienteService, private animaleService: AnimaleService, private messageService: MessageService, private fileService: FileService) { }

  ngOnInit() {
    this.whoIsLogged = sessionStorage.getItem("profile");
    if(this.whoIsLogged=="paziente"){
      this.homeService.getPaziente(sessionStorage.getItem("user")).subscribe(
        response => {
          console.log(response);
          this.pazienteSelezionato = response;
          //solo il primo per ora
          this.loadAnimale(response);
          
        }
      );
    }
    else if(this.whoIsLogged=="dottore"){
      this.homeService.getDottore(sessionStorage.getItem("user")).subscribe(
        response => {
          console.log(response);
          this.dottore = response;  
        }
      );
    }

  }

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
        this.loadAnimale(response);
        this.fileService.getAllPrescrizioniByAnimale(this.pazienteSelezionato.animale).subscribe(
          response => {
            console.log(response);
            for(let prescrizione of response){
              this.prescrizioni.push(prescrizione);
            }
          }
        );
      }
    );
  }
          
  downloadPDF(prescrizione: Prescrizione){
         
    this.fileService.download(prescrizione.id).subscribe(
      response => {
        console.log("download");
        console.log(response);
        let file = new Blob([response], { type: 'application/pdf' });
              
        var fileURL = URL.createObjectURL(file);
        
        window.open(fileURL, '_blank');
      });
  }


  salva(){

    let json = {
      /*nome: this.nome,
      data_nascita: this.data_nascita,
      genere: this.genere,
      tipo: this.tipo,
      peso: this.peso,
      altezza: this.altezza,*/
      paziente: this.pazienteSelezionato
    }

    this.animaleService.salva(json).subscribe(
      response => {
        console.log(response);
      }
    );

    this.messageService.add({key: 'saved', severity:'success', summary: 'Saved', detail: 'Cartella clinica salvata'});
  }

  loadAnimale(response: Object){
    response[0].data_nascita = new Date(response[0].data_nascita);
    this.pazienteSelezionato.animale = response[0];
  }

  onUpload(event) {

    let data = new FormData();

    for (let file of event.files) {
      data.append('file', file);
      
      
      data.append('dottore', JSON.stringify(this.dottore));
      data.append('animale', JSON.stringify(this.pazienteSelezionato.animale));
   
      this.fileService.uploadFile(data).subscribe(
        response => {
          console.log(response);
        }
      );
    }

    

    this.messageService.add({
      key: 'saved',
      severity: 'success',
      summary: 'File Uploaded',
      detail: ''
    });
  }

}
