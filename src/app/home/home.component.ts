import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticazioneService } from '../services/autenticazione.service';
import { HomeService } from '../services/home.service';
import { LoginService } from '../services/login.service';
import { PrenotazioneService } from '../services/prenotazione.service';

//import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  whoIsLogged: string;
  nome: string;
  cognome: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private homeService: HomeService, private service: PrenotazioneService, private loginService: LoginService, private authService: AutenticazioneService) { }

  ngOnInit() {
    this.whoIsLogged = this.activatedRoute.snapshot.paramMap.get('whoIsLogged');
    console.log(sessionStorage.getItem('user'));
    let paziente = this.homeService.getPaziente(sessionStorage.getItem('user')).subscribe(
      response => {
        console.log(response);
        this.nome = response['nome'];
        this.cognome = response['cognome'];
      }
    );
  }

  getCodaUrgenti() {
    this.service.getCodaUrgenti();
  }

  getCodaAttesa() {}

  getCodaAccettatti() {}

  logout(){
    this.authService.clearAll();
    this.router.navigate(['login']);
  }

}
