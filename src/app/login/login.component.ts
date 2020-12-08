import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ConditionalExpr } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  tipo_login = ""
  email: string = "";
  password: string = "";
  autenticato: boolean;

  constructor(
    private route : Router,
    private service : LoginService
  ) { }

  ngOnInit() {
  }

  setTipo(scelta : number){
    if(scelta == 1){
      this.tipo_login = "paziente";
    }else if(scelta == 2){
      this.tipo_login = "dottore";
    }else if(scelta == 3){
      this.tipo_login = "segretaria";
    }
  }

  login(){
    var json = {
      email: this.email,
      password: this.password,
    }
    if(this.tipo_login == "paziente"){
      this.autenticato = this.service.loginPaziente(json);
      if(this.autenticato == true){
        console.log("home");
        //this.route.navigate(['homePaziente'])
      }
      else
        console.log("non eseguito")
    }
    else if(this.tipo_login == "dottore"){
      this.autenticato = this.service.loginDottore(json);
      if(this.autenticato == true){
        console.log("home");
        //this.route.navigate(['homePaziente'])
      }
      else
        console.log("non eseguito")
    }
    else if(this.tipo_login == "segretaria"){
      this.autenticato = this.service.loginSegretaria(json);
      if(this.autenticato == true){
        console.log("home");
        //this.route.navigate(['homePaziente'])
      }
      else
        console.log("non eseguito");
    }
    else{
      alert("Seleziona la tipologia di utente che ti identifica, perfavore");
    }
  }

}
