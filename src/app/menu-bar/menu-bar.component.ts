import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AutenticazioneService } from '../services/autenticazione.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  items: MenuItem[];
  activeItem: MenuItem;

  constructor(private router: Router, private authService: AutenticazioneService) { }

  ngOnInit() {
    this.items = [
      {label: 'Veterinary Clinic', icon: 'pi pi-fw pi-home', routerLink: "/home/"+sessionStorage.getItem("profile")},
      {label: 'Cartella', icon: 'pi pi-fw pi-file', routerLink:"/cartella"},
      {label: 'Log out', icon: 'pi pi-fw pi-cog', command: () => this.logout()}
    ];

    this.activeItem = this.items[0];
  }


  logout(){
    this.authService.clearAll();
    this.router.navigate(['login']);
  }

}
