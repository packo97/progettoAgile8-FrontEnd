import { Component, OnInit} from '@angular/core';
import { Prenotazione } from '../prenotazione/prenotazione.component';
import { PrenotazioneService } from '../services/prenotazione.service';

@Component({
  selector: 'app-dettagli-prenotazione',
  templateUrl: './dettagli-prenotazione.component.html',
  styleUrls: ['./dettagli-prenotazione.component.css']
})
export class DettagliPrenotazioneComponent implements OnInit {

  prenotazione: Prenotazione;

  constructor(private service: PrenotazioneService) { }

  ngOnInit() {
    let subscription = this.service.getDetailChanged().subscribe(
      item => {
        this.prenotazione=item;
      }
    );
  }


}
