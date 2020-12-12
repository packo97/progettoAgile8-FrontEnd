import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private service: PrenotazioneService, private loginService: LoginService) { }

  ngOnInit() {
    this.whoIsLogged = this.activatedRoute.snapshot.paramMap.get('whoIsLogged');
  }

  getCodaUrgenti() {
    this.service.getCodaUrgenti();
  }

  getCodaAttesa() {}

  getCodaAccettatti() {}

  logout(){
    this.router.navigate(['login']);
  }

}
