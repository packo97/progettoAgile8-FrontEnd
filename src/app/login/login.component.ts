import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ConditionalExpr } from '@angular/compiler';
import { AutenticazioneService } from '../services/autenticazione.service';
import { MessageService } from 'primeng/api';


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
    //private service : LoginService,
    private authService: AutenticazioneService,
    private messageService: MessageService,

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
      tipo_login: this.tipo_login
    }

    if(this.tipo_login=="")
    {
      this.messageService.add({key: 'saved', severity:'error', summary: 'Login', detail: 'Seleziona una categoria di utente'});
    }
    else{
      this.authService.authenticate(json).subscribe(
        response => {
          if(response==true) {
            sessionStorage.setItem("user", this.email);
            sessionStorage.setItem("profile", this.tipo_login);
            this.autenticato = true;
            this.route.navigate(['home', this.tipo_login]);
          }
          else {
              this.autenticato = false;
              this.messageService.add({key: 'saved', severity:'error', summary: 'Login', detail: 'Email o password errati'});
          }
        });
    }
  }

}

