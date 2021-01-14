import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Messaggio } from 'src/app/messaggi/messaggi.component'
import { Nuovimessaggi } from 'src/app/menu-bar/menu-bar.component'

@Injectable({
  providedIn: 'root'
})

export class MessaggiService {


constructor(private httpClient : HttpClient) { }

getNotificheSegretaria() {
  return this.httpClient.get<Messaggio[]>("http://localhost:8080/restex/notificheBySegretaria");
}

getNotifichePaziente(email: String) {
  return this.httpClient.get<Messaggio[]>(`http://localhost:8080/restex/notificheByPaziente/${email}`);
}
getNotificheDottore(email: String) {
  return this.httpClient.get<Messaggio[]>(`http://localhost:8080/restex/notificheByDottore/${email}`);
}
thereAreAnyNewMessagePaziente(email: String) {
  return this.httpClient.get<Nuovimessaggi>(`http://localhost:8080/restex/newNotificheByPaziente/${email}`);
}
thereAreAnyNewMessageSegretaria() {
  return this.httpClient.get<Nuovimessaggi>(`http://localhost:8080/restex/newNotificheBySegretaria`);
}
thereAreAnyNewMessageDottore(email: String) {
  return this.httpClient.get<Nuovimessaggi>(`http://localhost:8080/restex/newNotificheByDottore/${email}`);
}
cancellaMessaggio(messaggio: Messaggio) {
  this.httpClient.delete("http://localhost:8080/restex/cancellaMessaggio/"+messaggio.id).subscribe(
    response => {
    }
  );}
}
