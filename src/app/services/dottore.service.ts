import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Dottore{

  constructor(
    public id: string,
    public nome: string,
    public cognome: string    
  ){}
}


export class Segretaria{

  constructor(
    public id: string,
    public nome: string,
    public cognome: string    
  ){}
}

@Injectable({
  providedIn: 'root'
})
export class DottoreService {

constructor(private httpClient: HttpClient) { }


getDottori(){
  return this.httpClient.get<Dottore[]>("http://localhost:8080/restex/dottore");
}

}
