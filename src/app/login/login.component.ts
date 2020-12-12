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
      this.service.loginPaziente(json).subscribe(
        response => {
          console.log(response);
          if(response == true)
            this.route.navigate(['home/','paziente'])
        }
      );
    }
    else if(this.tipo_login == "dottore"){
      this.service.loginPaziente(json).subscribe(
        response => {
          console.log(response);
          if(response == true)
            this.route.navigate(['home/','dottore'])
        }
      );
    }
    else if(this.tipo_login == "segretaria"){
      this.service.loginPaziente(json).subscribe(
        response => {
          console.log(response);
          if(response == true)
            this.route.navigate(['home/','segretaria'])
        }
      );
    }
    else{
      alert("Seleziona la tipologia di utente che ti identifica, perfavore");
    }
  }

}
