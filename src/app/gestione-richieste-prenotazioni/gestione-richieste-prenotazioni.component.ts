import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { PrenotazioneService } from '../services/prenotazione.service';
import { Prenotazione } from '../prenotazione/prenotazione.component';

@Component({
  selector: 'app-gestione-richieste-prenotazioni',
  templateUrl: './gestione-richieste-prenotazioni.component.html',
  styleUrls: ['./gestione-richieste-prenotazioni.component.css']
})
export class GestioneRichiestePrenotazioniComponent implements OnInit {

  prenotazioni_accettate: Prenotazione[];

  richieste: Prenotazione[];

  constructor(private prenotazioneService: PrenotazioneService) { }

  ngOnInit() {
    this.prenotazioneService.getCodaAttesa().subscribe(
      response => {
        console.log(response);
        this.richieste = response;
      }
    );

    this.prenotazioneService.getCodaAccettati().subscribe(
      response => {
        console.log(response);
        this.prenotazioni_accettate = response;
      }
    );
  }
  

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }

    console.log(this.prenotazioni_accettate);
  }
}
