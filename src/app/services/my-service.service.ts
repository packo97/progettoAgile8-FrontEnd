import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

constructor(
  private httpClient : HttpClient
) { }

registrazionePaziente(json){
  alert(JSON.stringify(json))
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
