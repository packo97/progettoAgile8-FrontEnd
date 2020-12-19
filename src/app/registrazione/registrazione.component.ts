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
    {
      this.salva();
    }
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
        this.salva2()
      }
    }
    
  }

  salva2(){
    this.messageService.add({key: 'saved', severity:'error', summary: 'Registrazione', detail: 'Seleziona una categoria di utente'});
  }
  salva(){
    this.messageService.add({key: 'saved', severity:'error', summary: 'Registrazione', detail: 'Inserisci dei dati validi'});
  }
}
