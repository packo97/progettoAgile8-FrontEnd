import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrazioneService } from '../services/registrazione.service';

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
    private service : RegistrazioneService 
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
    }
    
  }
}
