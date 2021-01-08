import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RecuperaPasswordService } from '../services/recupera-password.service';
import {DialogModule} from 'primeng/dialog';
export class RecuperaPassword{

  constructor(
    public email: string,
    public tipo_login: string,
    public codice: any,
    public nuovaPassword : string,
    ){}

}

@Component({
  selector: 'app-recupera-password',
  templateUrl: './recupera-password.component.html',
  styleUrls: ['./recupera-password.component.css']
})
export class RecuperaPasswordComponent implements OnInit {

  display: boolean = false;

  tipo_login = ""
  email: string = "";
  codice: string = null;
  nuovaPassword: string = null;
  confermaNuovaPassword: string = null;
  recuperaPassword : RecuperaPassword;

  constructor(private route : Router, private messageService: MessageService, private recuperaPasswordService : RecuperaPasswordService) { }

  ngOnInit() {
    document.getElementById("due").style.visibility = "hidden"; //oppure visible o None
    document.getElementById("tre").style.visibility = "hidden"; //oppure visible o None
    
  }


  setTipo(scelta : number){
    if(scelta == 1){
      this.tipo_login = "paziente";
    }else if(scelta == 2){
      this.tipo_login = "dottore";
    }else if(scelta == 3){
      this.tipo_login = "segretaria";
    }
  }

  showDialog() {
    this.display = true;
}
  inviaCodice(){

    if(this.tipo_login=="")
    {
      this.messageService.add({key: 'saved', severity:'error', summary: 'Recupera password', detail: 'Seleziona una categoria di utente'});
    }
    else if(this.email=="")
    {
      this.messageService.add({key: 'saved', severity:'error', summary: 'Recupera password', detail: 'Inserisci una email'});
    }
    else if(this.email!="" && this.email!=null)
    {
       
      var emailDiviso = this.email.split("@",2);
      if(emailDiviso.length==2)
      {
        var emailDiviso2 = emailDiviso[1].split(".",2);
        if(emailDiviso2.length!=2)
          this.messageService.add({key: 'saved', severity:'error', summary: 'Recupera password', detail: 'Inserisci una email valida'});
        else{
          this.recuperaPassword = new RecuperaPassword(this.email,this.tipo_login,"","");
          this.mostraConfermaCodice();
          this.recuperaPasswordService.inviaEmail(this.recuperaPassword).subscribe(
            response => {
              console.log(response);
              this.recuperaPassword=response;
              
            }
          );
          

        }
        }
      else{
        this.messageService.add({key: 'saved', severity:'error', summary: 'Recupera password', detail: 'Inserisci una email valida'});
      }
    }
  }
  
  mostraConfermaCodice(){
    document.getElementById("uno").style.display = "none"; //oppure visible o None
    document.getElementById("due").style.visibility= "visible" //oppure visible o None

  };

  mostraCambiaPassword(){
    if(this.codice=="")
    {
      this.messageService.add({key: 'saved', severity:'error', summary: 'Recupera password', detail: 'Inserisci il codice'});
    }
    if(this.codice != this.recuperaPassword.codice)
    {
      this.messageService.add({key: 'saved', severity:'error', summary: 'Recupera password', detail: 'Il codice inserito è errato'});
    }
    else{
      document.getElementById("uno").style.display = "none"; //oppure visible o None
      document.getElementById("due").style.display= "none" //oppure visible o None
      document.getElementById("tre").style.visibility= "visible" //oppure visible o None
    }

  };

  reimpostaPassword(){
    
    if(this.nuovaPassword == this.confermaNuovaPassword && this.nuovaPassword!="" && this.nuovaPassword.length>7)
    {
      this.recuperaPassword.nuovaPassword=this.nuovaPassword;
      this.recuperaPasswordService.modificaPassword(this.recuperaPassword).subscribe(
        response => {
          this.recuperaPassword=response;
          this.showDialog();
          this.route.navigate(['login']);   
        }
      );
    }
    if(this.nuovaPassword == this.confermaNuovaPassword && this.nuovaPassword!="" && this.nuovaPassword.length<8)
    {
      this.messageService.add({key: 'saved', severity:'error', summary: 'Recupera password', detail: 'Inserisci una password più sicura'}); 
    }
    else if(this.nuovaPassword != this.confermaNuovaPassword && this.nuovaPassword!="" && this.confermaNuovaPassword!=""){
      this.messageService.add({key: 'saved', severity:'error', summary: 'Recupera password', detail: 'Le due password non corrispondono'});
    }
    else if(this.nuovaPassword=="" || this.confermaNuovaPassword==""){
      this.messageService.add({key: 'saved', severity:'error', summary: 'Recupera password', detail: 'Inserisci entrambe le password'});
    }

  };
}
