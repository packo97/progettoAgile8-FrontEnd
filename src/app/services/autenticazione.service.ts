import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticazioneService {


  constructor(
    private loginService: LoginService
  ) { }


  authenticate = (json) => {
    
    if(json['tipo_login'] == "paziente")
      return this.loginService.loginPaziente(json);
    else if(json['tipo_login'] == "dottore")
      return this.loginService.loginDottore(json);
    else if(json['tipo_login'] == "segretaria")
      return this.loginService.loginSegretaria(json);
    
  }

  loggedUser = () => {
    let utente = sessionStorage.getItem("user");
    return (sessionStorage.getItem("user") != null) ? utente : "";
  }

  isLogged = () => {
    return sessionStorage.getItem("user") != null ? true : false;
  }


  clearAll = () => sessionStorage.removeItem("user");

}
