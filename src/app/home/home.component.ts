import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrenotazioneService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private root: Router, private service: PrenotazioneService) { }

  ngOnInit() {
  }

  getCodaUrgenti() {
    this.service.getCodaUrgenti();

  }

  getCodaAttesa() {}

  getCodaAccettatti() {}

}
