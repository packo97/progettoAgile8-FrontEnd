import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { PrenotazioneService } from '../services/prenotazione.service';
import { Prenotazione } from '../prenotazione/prenotazione.component';
import { Dottore, DottoreService } from '../services/dottore.service';
import { MessageService } from 'primeng/api';




@Component({
  selector: 'app-gestione-richieste-prenotazioni',
  templateUrl: './gestione-richieste-prenotazioni.component.html',
  styleUrls: ['./gestione-richieste-prenotazioni.component.css']
})
export class GestioneRichiestePrenotazioniComponent implements OnInit {

  prenotazioni_accettate: Prenotazione[];

  richieste: Prenotazione[];

  dottori: Dottore[];

  data: Date;

  dottoreSelezionato: Dottore;

  constructor(private prenotazioneService: PrenotazioneService, private dottoreService: DottoreService, private messageService: MessageService) { }

  ngOnInit() {

    this.dottoreService.getDottori().subscribe(
      response => {
        console.log(response);
        this.dottori = response;
      }
    )
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
  }


  refresh(prenotazione : Prenotazione){    
    this.prenotazioneService.refreshPanelDetail(prenotazione);
  }

  refreshPrenotazioniByDoctor(indice: number){
    
    if(indice != null){    
      this.dottoreSelezionato = this.dottori[indice];
    }

    if(this.data != null && this.dottoreSelezionato != null){
      this.prenotazioneService.getAllPrenotazioniByDoctor(this.dottoreSelezionato).subscribe(
        response => {
          console.log(response);
          this.prenotazioni_accettate = response;
        }
      );
      this.prenotazioneService.getAllRichiesteByDoctor(this.dottoreSelezionato).subscribe(
        response =>  {
          console.log(response);
          this.richieste = response;
        }
      ); 
    }

  }

  salva(){
    this.messageService.add({key: 'saved', severity:'success', summary: 'Saved', detail: 'Prenotazione Salvate'});
  }

}
