import { Component, OnInit } from '@angular/core';
import { MessaggiService } from '../services/messaggi.service';
import { Router } from '@angular/router';


export class Messaggio{

  constructor(
    public id: number,
    public testo: string,
    public oggetto: string,
    public data: any,
    public vista: boolean,
    public ricevitore: string,
    public paziente: any,
    public dottore: String,
    ){}

}

@Component({
  selector: 'app-messaggi',
  templateUrl: './messaggi.component.html',
  styleUrls: ['./messaggi.component.css']
})
export class MessaggiComponent implements OnInit {

  messaggi: Messaggio[] = [];
  vuota: Boolean = false;

  constructor(private router: Router,private messaggiService: MessaggiService) { }

  ngOnInit() {
    if(sessionStorage.getItem('profile')=="paziente")
      this.messaggiService.getNotifichePaziente(sessionStorage.getItem('user')).subscribe(
        response => {
          console.log(response);
          for (let i = 0; i < response.length; i++) {
              response[i].data=this.convertiData(response[i].data)
          }
          this.messaggi = response;
          if(this.messaggi.length==0){
            this.vuota=true;
          }
          else{
            this.vuota=false;
          }
        }
      );
    else if(sessionStorage.getItem('profile')=="segretaria")
        this.messaggiService.getNotificheSegretaria().subscribe(
          response => {
            console.log(response);
            for (let i = 0; i < response.length; i++) {
                response[i].data=this.convertiData(response[i].data)
            }
            this.messaggi = response;
            if(this.messaggi.length==0){
              this.vuota=true;
            }
            else{
              this.vuota=false;
            }
          }
        );
        else if(sessionStorage.getItem('profile')=="dottore")
        this.messaggiService.getNotificheDottore(sessionStorage.getItem('user')).subscribe(
          response => {
            console.log(response);
            for (let i = 0; i < response.length; i++) {
                response[i].data=this.convertiData(response[i].data)
            }
            this.messaggi = response;
            if(this.messaggi.length==0){
              this.vuota=true;
            }
            else{
              this.vuota=false;
            }
          }
        );
  }

  cancella(messaggio){
    this.messaggiService.cancellaMessaggio(messaggio);
    for(let i = 0; i < this.messaggi.length; i++){
      if(this.messaggi[i].id==messaggio.id)
      {
        this.messaggi.splice(i,1)
      }
    }
    if(this.messaggi.length==0)
    {
      this.vuota=true;
    }
  }

   convertiData(data){
    var str = data.toString(); 
    var giorni = str.split("T",2); 
    var dataCorretta = giorni[0].toString().split("-"); 
    var oreMinuti = giorni[1].toString().split(":",2);
    var s =dataCorretta[2]+"-"+dataCorretta[1]+"-"+dataCorretta[0]+"  "+oreMinuti[0]+":"+oreMinuti[1];
    return s;

  }

}
