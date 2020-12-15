import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private autenticato: boolean;

  constructor(
    private httpClient : HttpClient
  ) { }


  loginPaziente(json){
    return this.httpClient.post("http://localhost:8080/restex/loginPaziente",json);
  }

  loginDottore(json){
    return this.httpClient.post("http://localhost:8080/restex/loginDottore",json);
  }

  loginSegretaria(json){
    return this.httpClient.post("http://localhost:8080/restex/loginSegretaria",json);
  }
}


