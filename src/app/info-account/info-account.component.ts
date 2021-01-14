import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Animale, Paziente } from '../richiesta-prenotazione/richiesta-prenotazione.component';
import { AnimaleService } from '../services/animale.service';
import { Dottore, DottoreService, Segretaria } from '../services/dottore.service';
import { PazienteService } from '../services/paziente.service';
import { SegretariaService } from '../services/segretaria.service';





@Component({
  selector: 'app-info-account',
  templateUrl: './info-account.component.html',
  styleUrls: ['./info-account.component.css']
})
export class InfoAccountComponent implements OnInit {

  whoIsLogged: string;
  
  paziente: Paziente;

  dottore: Dottore;

  segretaria: Segretaria;

  modifica: boolean;

  showDialog: boolean;

  passwordVecchia: string;

  passwordNuova: string;

  nome: string;
  cognome: string;
  codice_fiscale: string;
  numero_telefono: string;
  email: string;
  animali: Animale[];
  img: any;


  constructor(private pazienteService: PazienteService, private segretariaService: SegretariaService, private dottoreService: DottoreService, private animaleService: AnimaleService, private messageService: MessageService) { }

  ngOnInit() {
    this.modifica = false;
    this.whoIsLogged = sessionStorage.getItem('profile');
  
    if(this.whoIsLogged == "paziente"){
      let email = sessionStorage.getItem('user');
      this.pazienteService.getPaziente(email).subscribe(
        response => {
          this.paziente = response;

          let base64img = this.paziente.img;
          if(base64img!=null)
            this.img = 'data:image/jpeg;base64,' + base64img;

          this.animaleService.getAnimali(this.paziente).subscribe(
            response => {
              this.paziente.animale = response;
              this.nome = this.paziente.nome;
              this.cognome = this.paziente.cognome;
              this.codice_fiscale = this.paziente.codice_fiscale;
              this.numero_telefono = this.paziente.numero_telefono;
              this.email = this.paziente.email;
              this.animali = this.paziente.animale;
            }
          )
          
        }
      );
    }
    else if(this.whoIsLogged == "dottore"){
      let email = sessionStorage.getItem('user');
      this.dottoreService.getDottore(email).subscribe(
        response => {
          this.dottore = response; 
          
          this.nome = this.dottore.nome;
          this.cognome = this.dottore.cognome;
          this.codice_fiscale = this.dottore.codice_fiscale;
          this.numero_telefono = this.dottore.numero_telefono;
          this.email = this.dottore.email;  
          
          let base64img = this.dottore.img;
          if(base64img!=null)
            this.img = 'data:image/jpeg;base64,' + base64img;
        }
      );
    }
    else if(this.whoIsLogged == "segretaria"){
      let email = sessionStorage.getItem('user');
      this.segretariaService.getSegretaria(email).subscribe(
        response => {
          this.segretaria = response; 
          
          this.nome = this.segretaria.nome;
          this.cognome = this.segretaria.cognome;
          this.codice_fiscale = this.segretaria.codice_fiscale;
          this.numero_telefono = this.segretaria.numero_telefono;
          this.email = this.segretaria.email;   
          
          let base64img = this.segretaria.img;
          if(base64img!=null)
            this.img = 'data:image/jpeg;base64,' + base64img;
        }
      );
    }

  }

  attivaModifica(){
    this.modifica = true;
  }

  salvaModifica(){

    if(this.whoIsLogged == "paziente"){
      this.paziente.nome = this.nome;
      this.paziente.cognome = this.cognome;
      this.paziente.codice_fiscale = this.codice_fiscale;
      this.paziente.numero_telefono = this.numero_telefono;
      this.paziente.email = this.email;
      this.paziente.animale = this.animali;

      this.pazienteService.updatePaziente(this.paziente).subscribe(
        response => {

          this.modifica = false;
          this.messageService.add({key: 'saved', severity:'success', summary: 'Salvato', detail: 'Dati utente aggiornati'});
        }
      )
    }
    else if(this.whoIsLogged == "dottore"){
      this.dottore.nome = this.nome;
      this.dottore.cognome = this.cognome;
      this.dottore.codice_fiscale = this.codice_fiscale;
      this.dottore.numero_telefono = this.numero_telefono;
      this.dottore.email = this.email;

      this.dottoreService.updateDottore(this.dottore).subscribe(
        response => {
  
          this.modifica = false;
          this.messageService.add({key: 'saved', severity:'success', summary: 'Salvato', detail: 'Dati utente aggiornati'});
        }
      )
    }
    else if(this.whoIsLogged == "segretaria"){
      this.segretaria.nome = this.nome;
      this.segretaria.cognome = this.cognome;
      this.segretaria.codice_fiscale = this.codice_fiscale;
      this.segretaria.numero_telefono = this.numero_telefono;
      this.segretaria.email = this.email;

      this.segretariaService.updateSegretaria(this.segretaria).subscribe(
        response => {

          this.modifica = false;
          this.messageService.add({key: 'saved', severity:'success', summary: 'Salvato', detail: 'Dati utente aggiornati'});
        }
      )
    }
  }

  cambiaPassword(){
    this.showDialog = true;
  }

  salvaPassword(){
    if(this.whoIsLogged == "paziente"){
      this.pazienteService.updatePassword(this.paziente, this.passwordVecchia,this.passwordNuova).subscribe(
        response => {

          if(response == "BAD_REQUEST")
            this.messageService.add({key: 'saved', severity:'error', summary: 'Errore', detail: 'La password vecchia non corrisponde'});
          else
            this.messageService.add({key: 'saved', severity:'success', summary: 'Salvato', detail: 'Password cambiata'});
        }
      );
    }
    else if(this.whoIsLogged == "dottore"){
      this.dottoreService.updatePassword(this.dottore, this.passwordVecchia,this.passwordNuova).subscribe(
        response => {

          if(response == "BAD_REQUEST")
            this.messageService.add({key: 'saved', severity:'error', summary: 'Errore', detail: 'La password vecchia non corrisponde'});
          else
            this.messageService.add({key: 'saved', severity:'success', summary: 'Salvato', detail: 'Password cambiata'});
        }
      );
    }
    else if(this.whoIsLogged == "segretaria"){
      this.segretariaService.updatePassword(this.segretaria, this.passwordVecchia,this.passwordNuova).subscribe(
        response => {

          if(response == "BAD_REQUEST")
            this.messageService.add({key: 'saved', severity:'error', summary: 'Errore', detail: 'La password vecchia non corrisponde'});
          else
            this.messageService.add({key: 'saved', severity:'success', summary: 'Salvato', detail: 'Password cambiata'});
        }
      );
    }
    this.showDialog = false;
  }

  upload(event){
    
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', event.files[0]);
    //event=null;
    if(this.whoIsLogged=="paziente"){
      uploadImageData.append('pazienteID', this.paziente.id.toString());

      this.pazienteService.updateImg(uploadImageData).subscribe(
        response => {
          if (response.status === 200) {
            this.ngOnInit();
            this.messageService.add({key: 'saved', severity:'success', summary: 'Salvata', detail: 'Nuova immagine del profilo salvata'});
          } else {
            this.messageService.add({key: 'saved', severity:'error', summary: 'Errore', detail: 'Immagine non salvata, la dimensione file non è adatta'});
          }
        }
      );
    }
    else if(this.whoIsLogged=="dottore"){
      uploadImageData.append('dottoreID', this.dottore.id.toString());

      this.dottoreService.updateImg(uploadImageData).subscribe(
        response => {
          if (response.status === 200) {
            this.messageService.add({key: 'saved', severity:'success', summary: 'Salvata', detail: 'Nuova immagine del profilo salvata'});
          } else {
            this.messageService.add({key: 'saved', severity:'error', summary: 'Errore', detail: 'Immagine non salvata, la dimensione file non è adatta'});
          }
        }
      );
    }
    else if(this.whoIsLogged=="segretaria"){
      uploadImageData.append('segretariaID', this.segretaria.id.toString());

      this.segretariaService.updateImg(uploadImageData).subscribe(
        response => {
          if (response.status === 200) {
            this.messageService.add({key: 'saved', severity:'success', summary: 'Salvata', detail: 'Nuova immagine del profilo salvata'});
          } else {
            this.messageService.add({key: 'saved', severity:'error', summary: 'Errore', detail: 'Immagine non salvata, la dimensione file non è adatta'});
          }
        }
      );
    }

  }

}
