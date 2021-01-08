import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Dottore{

  constructor(
    public id: string,
    public nome: string,
    public cognome: string,
    public codice_fiscale: string,
    public numero_telefono: string,
    public email: string,   
    public img: any 
  ){}
}


export class Segretaria{

  constructor(
    public id: string,
    public nome: string,
    public cognome: string,
    public codice_fiscale: string,
    public numero_telefono: string,
    public email: string,   
    public img: any  
  ){}
}

@Injectable({
  providedIn: 'root'
})
export class DottoreService {

  constructor(private httpClient: HttpClient) { }


  updateImg(uploadImageData: FormData){
    return this.httpClient.post('http://localhost:8080/restex/uploadImageDottore', uploadImageData, { observe: 'response' });
  }

  updatePassword(dottore: Dottore, passwordVecchia: string, passwordNuova: string){
    let json = {
      dottore: dottore,
      passwordVecchia: passwordVecchia,
      passwordNuova: passwordNuova
    };
    return this.httpClient.put("http://localhost:8080/restex/updatePasswordDottore", json);
  }

  updateDottore(dottore: Dottore){
    return this.httpClient.put("http://localhost:8080/restex/dottore",dottore);
  }

  getDottori(){
    return this.httpClient.get<Dottore[]>("http://localhost:8080/restex/dottore");
  }


  getDottore(email: string){
    return this.httpClient.get<Dottore>(`http://localhost:8080/restex/dottore/${email}`);
  }
}
