import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyServiceService } from '../services/my-service.service';

export class Paziente {
  public nome: string;
  public cognome: string;
}

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css']
})
export class RegistrazioneComponent implements OnInit {

  nome: string = "";
  cognome: string = "";

  constructor(
    private route : Router,
    private service : MyServiceService 
  ) { }

  ngOnInit() {
  }

  registrazione(){
    alert(this.nome + " " + this.cognome);
    
    //alert(this.service.getPaziente());
    alert(this.service.registrazione('nome'));
  }
}
