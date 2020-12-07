import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyServiceService } from '../services/my-service.service';

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
  indirizzo: string = "";
  descrizione: string = "";
  codice_identificativo_veterinario: string = ""


  constructor(
    private route : Router,
    private service : MyServiceService 
  ) { }

  ngOnInit() {
  }

  setTipo(scelta: number){
    if(scelta == 1){
      this.tipo_registrazione = "paziente";
    }
    else
      this.tipo_registrazione = "dottore";

      alert(this.tipo_registrazione);
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
        indirizzo: this.indirizzo,
        descrizione: this.descrizione,
        codice_identificativo: this.codice_identificativo_veterinario,
      }
      alert(this.codice_identificativo_veterinario);
      this.service.registrazioneDottore(jsonDottore);
    }
    
    
  }
}
