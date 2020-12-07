import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient : HttpClient
  ) { }


  loginPaziente(json){
    alert(JSON.stringify(json));
    this.httpClient.post("http://localhost:8080/restex/loginPaziente",json).subscribe(
      response => console.log(response)
    );
  }

  loginDottore(json){
    this.httpClient.post("http://localhost:8080/restex/loginDottore",json).subscribe(
      response => console.log(response)
    );
  }
}


