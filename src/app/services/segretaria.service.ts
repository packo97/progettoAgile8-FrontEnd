import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Segretaria } from './dottore.service';

@Injectable({
  providedIn: 'root'
})
export class SegretariaService {

  constructor(private httpClient: HttpClient) { }

  updateImg(uploadImageData: FormData){
    return this.httpClient.post('http://localhost:8080/restex/uploadImageSegretaria', uploadImageData, { observe: 'response' });
  }

  updatePassword(segretaria: Segretaria, passwordVecchia: string, passwordNuova: string){
    let json = {
      segretaria: segretaria,
      passwordVecchia: passwordVecchia,
      passwordNuova: passwordNuova
    };
    return this.httpClient.put("http://localhost:8080/restex/updatePasswordSegretaria", json);
  }

  updateSegretaria(segretaria: Segretaria){
    return this.httpClient.put("http://localhost:8080/restex/segretaria",segretaria);
  }

  getSegretaria(email: string){
    return this.httpClient.get<Segretaria>(`http://localhost:8080/restex/segretaria/${email}`);
  }

}
