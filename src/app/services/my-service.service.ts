import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


 
export class Paziente {
  nome: string;
  cognome: string;
}

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

constructor(
  private httpClient : HttpClient
) { }

registrazionePaziente(json){
 
  this.httpClient.post("http://localhost:8080/restex/paziente",json).subscribe(
    response => console.log(response)
  );
  
}

registrazioneDottore(json){
 
  this.httpClient.post("http://localhost:8080/restex/dottore",json).subscribe(
    response => console.log(response)
  );
  
}



}
