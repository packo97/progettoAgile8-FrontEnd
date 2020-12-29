import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AutenticazioneService } from '../services/autenticazione.service';
import { MessaggiService } from '../services/messaggi.service';


export class Nuovimessaggi{
  constructor(
    public nuoviMessaggi: string,
  ){}
}

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  items: MenuItem[];
  activeItem: MenuItem;
  nuoviMessaggi: Nuovimessaggi;
  icona:string;

  constructor(private router: Router, private authService: AutenticazioneService,private messaggiService: MessaggiService) { }

  ngOnInit() {

    this.items = [
      {label: 'Veterinary Clinic', icon: 'pi pi-fw pi-home', routerLink: "/home/"+sessionStorage.getItem("profile")},
      {label: 'Cartella ',  icon: 'pi pi-fw pi-file', routerLink:"/cartella"},
      {label: 'Messaggi ', icon: 'pi pi-fw pi-envelope', routerLink:"/messaggi"},
      {label: 'Log out', icon: 'pi pi-fw pi-cog', command: () => this.logout()}
     ];
     
     if(sessionStorage.getItem('profile')=="paziente"){
      this.messaggiService.thereAreAnyNewMessagePaziente(sessionStorage.getItem('user')).subscribe(
        response =>{
          if(response['nuoviMessaggi']=="true")
          {
            this.icona= 'pi pi-fw pi-spin pi-envelope';
            this.items[2].icon=this.icona;
          }
         
         this.activeItem = this.items[0];
  
        }
      );
     }
     else if(sessionStorage.getItem('profile')=="segretaria"){
      this.messaggiService.thereAreAnyNewMessageSegretaria().subscribe(
        response =>{
          if(response['nuoviMessaggi']=="true")
          {
            this.icona= 'pi pi-fw pi-spin pi-envelope';
            this.items[2].icon=this.icona;
          }
         
         this.activeItem = this.items[0];
  
        }
      );
     }
     else if(sessionStorage.getItem('profile')=="dottore"){
      this.messaggiService.thereAreAnyNewMessageDottore(sessionStorage.getItem('user')).subscribe(
        response =>{
          if(response['nuoviMessaggi']=="true")
          {
            this.icona= 'pi pi-fw pi-spin pi-envelope';
            this.items[2].icon=this.icona;
          }
         
         this.activeItem = this.items[0];
  
        }
      );
     }
    
     
    
  }


  logout(){
    this.authService.clearAll();
    this.router.navigate(['login']);
  }

}
