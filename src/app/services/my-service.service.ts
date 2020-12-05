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

registrazione(paziente: any){
  alert("sto qui")
  const body=JSON.stringify(paziente);
  this.httpClient.post("http://localhost:8080/restex/paziente",body);
  
}

getPaziente() {
  const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
  return this.httpClient.get('http://localhost:8080/restex/paziente', { headers, responseType: 'text'})
}

}
