import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  tipo_login = ""
  email: string = "";
  password: string = "";
  login_paziente: boolean;
  login_dottore: boolean;

  constructor(
    private route : Router,
    private service : LoginService
  ) { }

  ngOnInit() {
  }

  setTipo(scelta: number){
    if(scelta == 1){
      this.tipo_login = "paziente";
    }
    else
      this.tipo_login = "dottore";

      alert(this.tipo_login);
  }

  login(){
    var json = {
      email: this.email,
      password: this.password,
    }
    
    if(this.login_paziente != undefined){
      this.service.loginPaziente(json);
    }
    else if(this.login_dottore != undefined){
      this.service.loginDottore(json);
    }
  }

}
