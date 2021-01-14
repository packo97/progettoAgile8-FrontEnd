import { Injectable, Output, EventEmitter} from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { RecuperaPassword } from 'src/app/recupera-password/recupera-password.component'

@Injectable({
  providedIn: 'root'
})
export class RecuperaPasswordService {

constructor(
  private httpClient : HttpClient
) {
  
 }

 inviaEmail(recuperaPassword : RecuperaPassword){
   if(recuperaPassword.tipo_login=="paziente"){    
    return this.httpClient.post<RecuperaPassword>("http://localhost:8080/restex/inviaEmailPaziente",recuperaPassword);
   }  
  else if(recuperaPassword.tipo_login=="segretaria"){
    return this.httpClient.post<RecuperaPassword>("http://localhost:8080/restex/inviaEmailSegretaria",recuperaPassword);
    
  }else if(recuperaPassword.tipo_login=="dottore")
    return this.httpClient.post<RecuperaPassword>("http://localhost:8080/restex/inviaEmailDottore",recuperaPassword);
}
modificaPassword(recuperaPassword : RecuperaPassword){
  if(recuperaPassword.tipo_login=="paziente")
    return this.httpClient.post<RecuperaPassword>("http://localhost:8080/restex/modificaPasswordPaziente",recuperaPassword);
  else if(recuperaPassword.tipo_login=="segretaria")
    return this.httpClient.post<RecuperaPassword>("http://localhost:8080/restex/modificaPasswordSegretaria",recuperaPassword);
  else if(recuperaPassword.tipo_login=="dottore")
    return this.httpClient.post<RecuperaPassword>("http://localhost:8080/restex/modificaPasswordDottore",recuperaPassword);

}

}
