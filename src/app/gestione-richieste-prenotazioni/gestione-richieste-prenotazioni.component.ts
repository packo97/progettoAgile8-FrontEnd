import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { PrenotazioneService } from '../services/prenotazione.service';
import { Prenotazione } from '../prenotazione/prenotazione.component';
import { Dottore, DottoreService } from '../services/dottore.service';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { VistaGlobaleComponent } from '../vista-globale/vista-globale.component';
import { EventEmitterService } from '../services/eventEmitter.service';
import * as $ from 'jquery';



@Component({
  selector: 'app-gestione-richieste-prenotazioni',
  templateUrl: './gestione-richieste-prenotazioni.component.html',
  styleUrls: ['./gestione-richieste-prenotazioni.component.css']
})
export class GestioneRichiestePrenotazioniComponent implements OnInit {

  prenotazioni_accettate: Prenotazione[] = [];

  richieste: Prenotazione[];

  urgenti: Prenotazione[];

  dottori: Dottore[];

  data: Date;

  dottoreSelezionato: Dottore;
  constructor(private eventEmitterService: EventEmitterService,private dialogService: DialogService, private prenotazioneService: PrenotazioneService, private dottoreService: DottoreService, private messageService: MessageService) { }

  ngOnInit() {
    this.dottoreService.getDottori().subscribe(
      response => {
        console.log(response);
        this.dottori = response;
      }
    );

    //quando viene selezionata una data dal full calendar-> chiudi il modal -> seleziona la nuova data -> refresh dei dati visualizzati
    if (this.eventEmitterService.subsVar==undefined) {    
      this.eventEmitterService.subsVar = this.eventEmitterService.    
      invokeFirstComponentFunction.subscribe((name:string) => {    
        this.ref.close();
        this.data = new Date(name);
        this.refreshPrenotazioniByDoctor(null);
      });    
    }    

  }
  
  convertiData(data){
    if(data==null || data=="La data della visita non è assegnata")
      return "La data della visita non è assegnata";

    var str = data.toString(); 
    var giorni = str.split("T",2); 
    if(giorni.length==2)
    { 
      var dataCorretta = giorni[0].toString().split("-"); 
      var oreMinuti = giorni[1].toString().split(":",2);
      var s =dataCorretta[2]+"-"+dataCorretta[1]+"-"+dataCorretta[0]+"  "+oreMinuti[0]+":"+oreMinuti[1];
      return s;
    }
    return data;

  }

  drop(event: CdkDragDrop<string[]>, droppedOn: "richieste" | "prenotazioni_accettate" | "urgenti") {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
     
      if(droppedOn === "prenotazioni_accettate"){
        for(let i=0; i<this.prenotazioni_accettate.length; i++)
          if(this.prenotazioni_accettate[i].id==null)
            this.prenotazioni_accettate[i] = new Prenotazione(null,"Time-slot libero alle " + (9+i),null,null,null,null,null);
        }
      
        
    } else {
      if (droppedOn === "richieste" || droppedOn === "urgenti") {
        transferArrayItem(event.previousContainer.data,
                          event.container.data,
                          event.previousIndex,
                          event.currentIndex);
       if(event.container.id=="cdk-drop-list-2" || event.previousContainer.id =="cdk-drop-list-2")               
        this.prenotazioni_accettate.splice(event.previousIndex,0,new Prenotazione(null,"Time-slot libero alle " + (event.previousIndex+9),null,null,null,this.data,null))
      }else{
        const prediction = this.prenotazioni_accettate[event.currentIndex];
        if (!prediction.id) {
          // dropped on blank, remove it
          this.prenotazioni_accettate.splice(event.currentIndex, 1);
        } else {
          // dropped on a team, remove the first blank
          const firstBlank = this.prenotazioni_accettate.findIndex(t => !t.id);
          this.prenotazioni_accettate.splice(firstBlank, 1);
        }
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
    }
    this.refreshData();

  }

  refreshData(){
    let hour = 8;
    for(let p of this.prenotazioni_accettate){
      
      let newDate = new Date(this.data);
      newDate.setHours(this.data.getHours()+hour);

      var split_data_orario = newDate.toLocaleString().split(", ",2);
      var split_giorno_mese_anno = split_data_orario[0].split("/",3);
      var dataFormatoCorretto= split_giorno_mese_anno[2]+"-"+split_giorno_mese_anno[1]+"-"+split_giorno_mese_anno[0]+"T".concat(split_data_orario[1]+".000Z");

      p.data_visita = this.convertiData(dataFormatoCorretto);
      //p.data_visita = dataFormatoCorretto;

      hour++;
    }
    console.log("data after refresh: " + this.data);
    for(let p of this.richieste){
      p.data_visita="La data della visita non è assegnata";
    }
    for(let p of this.urgenti){
      p.data_visita="La data della visita non è assegnata";
    }
  }
  

  refresh(prenotazione : Prenotazione){
    console.log("data: " + this.data);
    console.log("prenotazione: ");
    console.log(prenotazione);
    this.prenotazioneService.refreshPanelDetail(prenotazione);
  }

  refreshPrenotazioniByDoctor(indice: number){
    
    if(indice != null){    
      this.dottoreSelezionato = this.dottori[indice];
    }

    if(this.data != null && this.dottoreSelezionato != null){
      this.prenotazioneService.getAllPrenotazioniByDoctorAndDate(this.dottoreSelezionato, this.data).subscribe(
        response => {
          this.showAccettate(response);
        }
      );
      this.prenotazioneService.getAllRichiesteByDoctor(this.dottoreSelezionato).subscribe(
        response =>  {
          this.richieste = response;
        }
      );
      this.prenotazioneService.getAllUrgentiByDoctor(this.dottoreSelezionato).subscribe(
        response => {
          this.urgenti = response;
        }
      ) 
    }

  }

  showAccettate(response: Prenotazione[]){
    if(response.length > 0){
      let first_date=new Date(response[0].data_visita);
      let diff = first_date.getHours() - 9;
      for(let q=0; q<diff; q++)
        response.splice(q,0,new Prenotazione(null,"Time-slot libero alle " + (9+q),null,null,null,null,null))  
    }
    

    for(let i=0; i<response.length; i++){
        if(i < response.length - 1 && response[i].id!=null){
          let data1 = new Date(response[i].data_visita);
          let data2 = new Date(response[i+1].data_visita);
    
          if(data1.getHours() < data2.getHours()){
            let diff = data2.getHours() - data1.getHours();
            for(let j=0; j<diff - 1; j++){;
              response.splice(i+j+1,0,new Prenotazione(null,"Time-slot libero alle " + (data1.getHours() + j + 1),null,null,null,null,null));
            }
        }
            
        }
          
          
    }
    let count = response.length;
    let slot_liberi = 12 - response.length;
    for(let k=0; k<slot_liberi; k++){
      response.push(new Prenotazione(null,"Time-slot libero alle " + (k+9+count),null,null,null,null,null));
    }
    this.prenotazioni_accettate = response;
    console.log(this.prenotazioni_accettate);
  }


  salva(){
    let cloned = this.prenotazioni_accettate.map(x => Object.assign({}, x));

    for(let p of cloned){
      var split_data_orario = p.data_visita.split("  ",2);
      console.log(split_data_orario);
      var split_giorno_mese_anno = split_data_orario[0].split("-",3);
      var dataFormatoCorretto= split_giorno_mese_anno[2]+"-"+split_giorno_mese_anno[1]+"-"+split_giorno_mese_anno[0]+"T".concat(split_data_orario[1]+":00.000Z");
      p.data_visita=dataFormatoCorretto;

      //p.data_visita=new Date(p.data_visita);

    }
 
    this.prenotazioni_accettate.forEach(
      prenotazioni => {
        if(prenotazioni.id)
          prenotazioni.confermato = true;
      }
    )
    this.richieste.forEach(
      prenotazioni => {
        prenotazioni.confermato = false;
        prenotazioni.data_visita = null;
        prenotazioni.urgente = false;

      }
    )

    this.urgenti.forEach(
      prenotazioni => {
        prenotazioni.confermato = false;
        prenotazioni.urgente = true;
        prenotazioni.data_visita = null;
      }
    )

    for(let prenotazione of cloned){
      if(prenotazione.id != null){
        this.prenotazioneService.updateStato(prenotazione);
      }
        
    }

    for(let prenotazione of this.richieste){
      if(prenotazione.id != null)
        this.prenotazioneService.updateStato(prenotazione);
    }

    for(let prenotazione of this.urgenti){
      if(prenotazione.id != null)
        this.prenotazioneService.updateStato(prenotazione);
    }


    this.messageService.add({key: 'saved', severity:'success', summary: 'Saved', detail: 'Prenotazione Salvate'});
  }

  ref: DynamicDialogRef;

  show() {
    this.ref = this.dialogService.open(VistaGlobaleComponent, {
        width: '80%',
        contentStyle: {"max-height": "800px"},
        data: {dottore: this.dottoreSelezionato},

    });

  }

  
  
}
