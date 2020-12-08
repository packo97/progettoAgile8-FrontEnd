import { Injectable } from '@angular/core';
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
    console.log(this.httpClient.post("http://localhost:8080/restex/loginPaziente",json).subscribe(
      response => {
        console.log(response);
        this.autenticato = Boolean(response);
      }
    ));
    return this.autenticato;
  }

  loginDottore(json){
    this.httpClient.post("http://localhost:8080/restex/loginDottore",json).subscribe(
      response => {
        console.log(response);
        this.autenticato = Boolean(response);  
      }   
    );
    return this.autenticato;
  }

  loginSegretaria(json){
    this.httpClient.post("http://localhost:8080/restex/loginSegretaria",json).subscribe(
      response => {
        console.log(response);
        this.autenticato = Boolean(response);
      }
    );
    return this.autenticato;
  }
}


