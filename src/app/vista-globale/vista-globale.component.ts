import { Component, Input, OnInit } from '@angular/core';
import { Calendar, CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { PrenotazioneService } from '../services/prenotazione.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventEmitterService } from '../services/eventEmitter.service';
import { Prenotazione } from '../prenotazione/prenotazione.component';
import { Tooltip } from 'primeng/tooltip';
import * as $ from 'jquery';
import { Dottore } from '../services/dottore.service';
import { CartellaClinicaComponent } from '../cartella-clinica/cartella-clinica.component';
@Component({
  selector: 'app-vista-globale',
  templateUrl: './vista-globale.component.html',
  styleUrls: ['./vista-globale.component.css']
})
export class VistaGlobaleComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.changeDate.bind(this), // bind is important!
    events: [],
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'dayGridMonth dayGridWeek'
    },
  };

  constructor(private eventEmitterService: EventEmitterService, private prenotazioneService: PrenotazioneService, public config: DynamicDialogConfig) {

  
  }

  events: any[] = [];

  ngOnInit() {
  
    let dottore = this.config.data.dottore;
    if(dottore != null){
      this.prenotazioneService.getAllPrenotazioniByDoctor(dottore).subscribe(
        response => {
          console.log(response);
       
          for(let p of response){
            if(p.urgente)
              this.events.push({id: this.events.length,title: p.paziente.nome+" "+p.paziente.cognome, date: p.data_visita, display: 'block', color: 'red'})
            else
              this.events.push({id: this.events.length,title: p.paziente.nome+" "+p.paziente.cognome, date: p.data_visita, display: 'block', color: 'green'})
          }
          this.calendarOptions.events=this.events;
        }
      );
    }
      
  }


  changeDate(arg) {
    this.eventEmitterService.onFirstComponentButtonClick(arg.dateStr);   
  }

}
