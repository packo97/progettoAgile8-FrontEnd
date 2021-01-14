import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrazioneService {

  constructor(
    private httpClient : HttpClient
  ) { }
  
  registrazionePaziente(json){
    this.httpClient.post("http://localhost:8080/restex/paziente",json).subscribe();
  }
  
  registrazioneDottore(json){
    console.log("ciao");
    this.httpClient.post("http://localhost:8080/restex/dottore",json).subscribe(); 
  }

  registrazioneSegretaria(json){
    this.httpClient.post("http://localhost:8080/restex/segretaria",json).subscribe();  
  }

}
