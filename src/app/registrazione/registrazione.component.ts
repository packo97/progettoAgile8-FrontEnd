import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrazioneService } from '../services/registrazione.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css']
})
export class RegistrazioneComponent implements OnInit {

  tipo_registrazione : string = ""
  nome: string = "";
  cognome: string = "";
  codice_fiscale: string = "";
  numero_telefono: string = "";
  email: string = "";
  password: string = "";
  descrizione: string = "";
  codice_identificativo_veterinario: string = ""

  regexpCF : RegExp = new RegExp('^[a-zA-Z]{6}[0-9]{2}[abcdehlmprstABCDEHLMPRST]{1}[0-9]{2}([a-zA-Z]{1}[0-9]{3})[a-zA-Z]{1}$');
  regexpNT : RegExp = new RegExp('^[0-9]+$');


  constructor(
    private route : Router,
    private service : RegistrazioneService, 
    private messageService: MessageService
  ) { }

  ngOnInit() {
  }

  setTipo(scelta: number){
    if(scelta == 1){
      this.tipo_registrazione = "paziente";

    }
    else if(scelta == 2){
      this.tipo_registrazione = "dottore";
    }
    else if(scelta == 3){
      this.tipo_registrazione = "segretaria";
    }
  }

  registrazione(){
    if(this.nome=="" || this.cognome=="" || this.codice_fiscale=="" || this.numero_telefono=="" || this.email=="" || this.password=="")
      this.messageService.add({key: 'saved', severity:'error', summary: 'Registrazione', detail: 'Compila tutti i campi'});
    else if(this.regexpNT.test(this.numero_telefono)==false)
      this.messageService.add({key: 'saved', severity:'error', summary: 'Registrazione', detail: 'Il numero di telefono non è valido'});
    else if(this.regexpCF.test(this.codice_fiscale)==false)
      this.messageService.add({key: 'saved', severity:'error', summary: 'Registrazione', detail: 'Il codice fiscale non è valido'});
    else if(this.numero_telefono.length<9 || this.numero_telefono.length>12)
      this.messageService.add({key: 'saved', severity:'error', summary: 'Registrazione', detail: 'Inserisci un numero di telefono valido'});
    else if(this.password.length<8)
      this.messageService.add({key: 'saved', severity:'error', summary: 'Registrazione', detail: 'Password troppo corta'});
    else if(this.password.length>25)
      this.messageService.add({key: 'saved', severity:'error', summary: 'Registrazione', detail: 'Password troppo lunga'});
    else if(this.email!="" && this.email!=null)
    {     
      var emailDiviso = this.email.split("@",2);
      if(emailDiviso.length==2)
      {
        var emailDiviso2 = emailDiviso[1].split(".",2);
        if(emailDiviso2.length!=2)
          this.messageService.add({key: 'saved', severity:'error', summary: 'Registrazione', detail: 'Inserisci una email valida'});
          else{
            if(this.tipo_registrazione == "paziente"){
              var jsonPaziente = {
                nome: this.nome,
                cognome: this.cognome,
                codice_fiscale: this.codice_fiscale,
                numero_telefono: this.numero_telefono,
                email:  this.email,
                password:  this.password,
              }
              this.service.registrazionePaziente(jsonPaziente).subscribe(
                response => {
                  this.route.navigate(['login']);
                },
                error => {
                  this.messageService.add({key: 'saved', severity:'error', summary: 'Registrazione', detail: 'Email già presente!'});
                }
              );
              
            }
            else if(this.tipo_registrazione == "dottore"){
              var jsonDottore = {
                nome: this.nome,
                cognome: this.cognome,
                codice_fiscale: this.codice_fiscale,
                numero_telefono: this.numero_telefono,
                email:  this.email,
                password:  this.password,
                descrizione: this.descrizione,
                codice_identificativo: this.codice_identificativo_veterinario,
              }
              this.service.registrazioneDottore(jsonDottore).subscribe(
                response => {
                  this.route.navigate(['login']);
                },
                error => {
                  this.messageService.add({key: 'saved', severity:'error', summary: 'Registrazione', detail: 'Email già presente!'});
                }
              );
            }
            else if(this.tipo_registrazione == "segretaria"){
              var jsonSegretaria = {
                nome: this.nome,
                cognome: this.cognome,
                codice_fiscale: this.codice_fiscale,
                numero_telefono: this.numero_telefono,
                email:  this.email,
                password:  this.password,
              }
              this.service.registrazioneSegretaria(jsonSegretaria).subscribe(
                response => {
                  this.route.navigate(['login']);
                },
                error => {
                  this.messageService.add({key: 'saved', severity:'error', summary: 'Registrazione', detail: 'Email già presente!'});
                }
              );
            }
            else{
              this.messageService.add({key: 'saved', severity:'error', summary: 'Registrazione', detail: 'Seleziona una categoria di utente'});
            }
          }
      
      
        }
      else{
        this.messageService.add({key: 'saved', severity:'error', summary: 'Registrazione', detail: 'Inserisci una email valida'});
      }
    }

    /*else{
      if(this.tipo_registrazione == "paziente"){
        var jsonPaziente = {
          nome: this.nome,
          cognome: this.cognome,
          codice_fiscale: this.codice_fiscale,
          numero_telefono: this.numero_telefono,
          email:  this.email,
          password:  this.password,
        }
        this.service.registrazionePaziente(jsonPaziente);
        this.route.navigate(['login']);
      }
      else if(this.tipo_registrazione == "dottore"){
        var jsonDottore = {
          nome: this.nome,
          cognome: this.cognome,
          codice_fiscale: this.codice_fiscale,
          numero_telefono: this.numero_telefono,
          email:  this.email,
          password:  this.password,
          descrizione: this.descrizione,
          codice_identificativo: this.codice_identificativo_veterinario,
        }
        this.service.registrazioneDottore(jsonDottore);
        this.route.navigate(['login']);
      }
      else if(this.tipo_registrazione == "segretaria"){
        var jsonSegretaria = {
          nome: this.nome,
          cognome: this.cognome,
          codice_fiscale: this.codice_fiscale,
          numero_telefono: this.numero_telefono,
          email:  this.email,
          password:  this.password,
        }
        this.service.registrazioneSegretaria(jsonSegretaria);
        this.route.navigate(['login']);
      }
      else{
        this.messageService.add({key: 'saved', severity:'error', summary: 'Registrazione', detail: 'Seleziona una categoria di utente'});
      }
    }*/
    
  }

}
