import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Prenotazione } from '../prenotazione/prenotazione.component';
import { Animale, Paziente } from '../richiesta-prenotazione/richiesta-prenotazione.component';
import { AnimaleService } from '../services/animale.service';
import { Dottore } from '../services/dottore.service';
import { FileService } from '../services/file.service';
import { HomeService } from '../services/home.service';
import { PazienteService } from '../services/paziente.service';
import { PrenotazioneService } from '../services/prenotazione.service';
import { VistaGlobaleComponent } from '../vista-globale/vista-globale.component';


export class ItemRicevuta{
  constructor(
    public codice: number,
    public  descrizione: string,
    public quantita: number,
    public prezzo: number,
    public totale: number
  ){}
}

export class ItemPrescrizione{
  constructor(
    public medicinale: string,
    public quantita: number,
    public dose_di_impiego: number,
    public giorni_trattamento: number,
    public giorni_sospensione: number
  ){}
}


export class Prescrizione{
  constructor(
    public id: number,
    public dottore: Dottore,
    public animale: Animale,
    public content: any
  ){}
}

export class Ricevuta{
  constructor(
    public id: number,
    public dottore: Dottore,
    public animale: Animale,
    public content: any,
  ){}
}

export class Esame{
  constructor(
    public id: number,
    public descrizione: string,
    public dottore: Dottore,
    public animale: Animale,
    public content: any,
  ){}
}

@Component({
  selector: 'app-cartella-clinica',
  templateUrl: './cartella-clinica.component.html',
  styleUrls: ['./cartella-clinica.component.css']
})
export class CartellaClinicaComponent implements OnInit {

  valoreRicerca: string;

  pazienti: Paziente[];

  pazienteSelezionato: Paziente;

  dottore: Dottore;

  prescrizioni: Prescrizione[] = [];

  ricevute: Ricevuta[] = [];

  esami: Esame[] = [];

  whoIsLogged: string;

  animaleSelezionato: Animale;

  display_descrizione: boolean;

  constructor(private dialogService: DialogService,private prenotazioneService: PrenotazioneService, private homeService: HomeService, private pazienteService: PazienteService, private animaleService: AnimaleService, private messageService: MessageService, private fileService: FileService) { }

  ngOnInit() {

    this.display_descrizione=false;
    this.whoIsLogged = sessionStorage.getItem("profile");
    if(this.whoIsLogged=="paziente"){
      this.homeService.getPaziente(sessionStorage.getItem("user")).subscribe(
        response => {
          console.log(response);
          this.pazienteSelezionato = response;
          this.animaleService.getAnimali(this.pazienteSelezionato).subscribe(
            response => {
              console.log(response);
              this.loadAnimale(response);

            }
          );
          
        }
      );
    }
    else if(this.whoIsLogged=="dottore"){
      this.homeService.getDottore(sessionStorage.getItem("user")).subscribe(
        response => {
          console.log(response);
          this.dottore = response;  
        }
      );
    }

  }

  ricerca(){
    this.pazienteService.ricerca(this.valoreRicerca).subscribe(
      response => {
        console.log(this.valoreRicerca);
        console.log(response);
        this.pazienti = response;
      }
    );
  }

  selezionato(paziente: Paziente){
    this.pazienteSelezionato = paziente;
    this.animaleService.getAnimali(this.pazienteSelezionato).subscribe(
      response => {
        console.log(response);
        this.loadAnimale(response);
          
      } 
    );
  }

  downloadPrescrizione(prescrizione: Prescrizione){
         
    this.fileService.downloadPrescrizione(prescrizione.id).subscribe(
      response => {
        console.log("download");
        console.log(response);
        let file = new Blob([response], { type: 'application/pdf' });
              
        var fileURL = URL.createObjectURL(file);
        
        window.open(fileURL, '_blank');
      });
  }

  downloadRicevuta(ricevuta: Ricevuta){
         
    this.fileService.downloadRicevuta(ricevuta.id).subscribe(
      response => {
        console.log("download");
        console.log(response);
        let file = new Blob([response], { type: 'application/pdf' });
              
        var fileURL = URL.createObjectURL(file);
        
        window.open(fileURL, '_blank');
      });
  }

  downloadEsame(esame: Esame){
         
    this.fileService.downloadEsame(esame.id).subscribe(
      response => {
        console.log("download");
        console.log(response);
        let file = new Blob([response], { type: 'application/pdf' });
              
        var fileURL = URL.createObjectURL(file);
        
        window.open(fileURL, '_blank');
      });
  }


  salva(){
    for(let animale of this.pazienteSelezionato.animale){
      let json = {
        id: animale.id,
        nome: animale.nome,
        data_nascita: animale.data_nascita,
        genere: animale.genere,
        tipo: animale.tipo,
        peso: animale.peso,
        altezza: animale.altezza,
        paziente: this.pazienteSelezionato
      }
  
      this.animaleService.salva(json).subscribe(
        response => {
          console.log(response);
        }
      );
    }
    

    this.messageService.add({key: 'saved', severity:'success', summary: 'Saved', detail: 'Cartella clinica salvata'});
  }

  loadAnimale(response: Animale[]){
    
    if(response.length >0){
      for(let r of response)
        r.data_nascita = new Date(r.data_nascita);
        this.pazienteSelezionato.animale = response;
        this.animaleSelezionato = this.pazienteSelezionato.animale[0];
      }
    else
      this.animaleSelezionato = null;

    if(this.animaleSelezionato!=null)
    for(let animale of this.pazienteSelezionato.animale){
      this.fileService.getAllPrescrizioniByAnimale(animale).subscribe(
        response => {
          console.log(response);
          for(let prescrizione of response){
            this.prescrizioni.push(prescrizione);
          }
        }
      );

    this.fileService.getAllRicevuteByAnimale(animale).subscribe(
      response => {
        console.log(response);
        for(let ricevuta of response){
          this.ricevute.push(ricevuta);
        }
      }
    );

    this.fileService.getAllEsamiByAnimale(animale).subscribe(
      response => {
        console.log(response);
        for(let esame of response){
          this.esami.push(esame);
        }
      }
    );
  }
  }

  onUploadPrescrizioni(event) {

    let data = new FormData();

    for (let file of event.files) {
      data.append('file', file);
      
      
      data.append('dottore', JSON.stringify(this.dottore));
      data.append('animale', JSON.stringify(this.animaleSelezionato));
   
      this.fileService.uploadPrescrizione(data).subscribe(
        response => {
          console.log(response);
        }
      );
    }

    this.messageService.add({
      key: 'saved',
      severity: 'success',
      summary: 'File Uploaded',
      detail: ''
    });
  }

  onUploadRicevute(event) {

    let data = new FormData();

    for (let file of event.files) {
      data.append('file', file);
      
      
      data.append('dottore', JSON.stringify(this.dottore));
      data.append('animale', JSON.stringify(this.animaleSelezionato));
   
      this.fileService.uploadRicevute(data).subscribe(
        response => {
          console.log(response);
        }
      );
    }

    this.messageService.add({
      key: 'saved',
      severity: 'success',
      summary: 'File Uploaded',
      detail: ''
    });
  }
  showDialogDescrizione(event){
    this.display_descrizione=true;
    for (let file of event.files) {
      this.datiesame.append('file', file);
      
      
      this.datiesame.append('dottore', JSON.stringify(this.dottore));
      this.datiesame.append('animale', JSON.stringify(this.animaleSelezionato));
    
    }
  }
  datiesame = new FormData();
  onUploadEsami() {
    
    
    this.datiesame.append('descrizione', this.descrizione);

    
      
      console.log(this.descrizione);
      this.fileService.uploadEsami(this.datiesame).subscribe(
        response => {
          console.log(response);
        }
      );
    

    this.messageService.add({
      key: 'saved',
      severity: 'success',
      summary: 'File Uploaded',
      detail: ''
    });

    this.display_descrizione = false;
  }

  ref: DynamicDialogRef;

  show() {
    this.ref = this.dialogService.open(VistaGlobaleComponent, {
        width: '80%',
        contentStyle: {"max-height": "800px"},
        data: {dottore: this.dottore},

    });
  }


  display: boolean = false;
  displayAnimale: boolean = false;
  problema: string;
  slotLiberi: string[] = [];
  slotSelezionato: string;
  descrizione: string;

  newAnimale : Animale= new Animale(1,null,null,null,null,null,null,null);

  showFormInserisciPrenotazione() {
      this.display = true;
  }

  inserisciPrenotazione(){
    let ora = Number(this.slotSelezionato.replace("Time-slot libero alle ",""));
    this.data.setHours(ora+1); //TODO bug da risolvere
    alert(this.data);
   
    let p=new Prenotazione(1,this.problema,this.pazienteSelezionato,this.dottore,true,this.data,false);
    this.prenotazioneService.addRichiestaPrenotazione(p)
    this.messageService.add({key: 'saved', severity:'success', summary: 'Saved', detail: 'Prenotazione inserita'});
    this.display=false;
    
    
  }
  inserisciAnimale(){
    this.newAnimale.paziente=this.pazienteSelezionato;
    this.animaleService.add(this.newAnimale).subscribe(
      response =>{
        console.log(response);
        this.messageService.add({key: 'saved', severity:'success', summary: 'Saved', detail: 'Animale inserito correttamente'});
        this.displayAnimale=false;
      }
    );
  }
  showDialogAnimale(){
    this.displayAnimale=true;
  }

  public data:Date;   
  refreshSlot(){
    
    this.prenotazioneService.getAllPrenotazioniByDoctorAndDate(this.dottore,this.data).subscribe(
      response =>{        
        for(let i=0; i<12; i++){
          let presente=false;
          for(let p of response){
              var orario = new Date(p.data_visita).getHours();
              if(orario==i+9)
              {
                presente=true;
              }
            }
            if(!presente){
              let ora=i+9;
              this.slotLiberi.push("Time-slot libero alle "+ ora);
            }
          }
      }
    );
  }

  display_ricevuta: boolean;
  display_item_ricevuta: boolean;
  codice: number;
  descrizione_item :string;
  quantita_item: number;
  prezzo_item: number;
  importo_pagato: number;
  lista_item_ricevuta: ItemRicevuta[] = [];
  showRicevuta(){
    this.display_ricevuta = true;
  }

  show_item_ricevuta(){
    this.display_item_ricevuta = true;
  }

  aggiungiItemRicevuta(codice,descrizione_item,quantita,prezzo_item){
    
    let item : ItemRicevuta = new ItemRicevuta(codice, descrizione_item, quantita, prezzo_item, prezzo_item*this.quantita_item);
    this.lista_item_ricevuta.push(item);
    this.display_item_ricevuta = false;
  }

  creaRicevuta(){
    this.fileService.creaRicevuta(this.dottore, this.pazienteSelezionato, this.lista_item_ricevuta, this.importo_pagato).subscribe(
      response => {
        console.log(response);
        let file = new Blob([response], { type: 'application/pdf' });
              
        var fileURL = URL.createObjectURL(file);
        
        window.open(fileURL, '_blank');
      }
    );
  }
  
  display_prescrizione: boolean;
  display_item_prescrizione: boolean;
  lista_item_prescrizione: ItemPrescrizione[] = [];
  medicinale: string;
  quantita_medicinale: number;
  dose_di_impiego: number;
  giorni_trattamento: number;
  giorni_sospensione: number;

  showPrescrizione(){
    this.display_prescrizione = true;
  }

  show_item_prescrizione(){
    this.display_item_prescrizione = true;
  }

  aggiungiItemPrescrizione(medicinale,quantita_medicinale,dose_di_impiego,giorni_trattamento,giorni_sospensione){
    let item : ItemPrescrizione = new ItemPrescrizione(medicinale, quantita_medicinale, dose_di_impiego, giorni_trattamento,giorni_sospensione);
    this.lista_item_prescrizione.push(item);
    this.display_item_prescrizione = false;
  }

  creaPrescrizione(){
    this.fileService.creaPrescrizione(this.dottore, this.pazienteSelezionato, this.lista_item_prescrizione, this.animaleSelezionato).subscribe(
      response => {
        console.log(response);
        let file = new Blob([response], { type: 'application/pdf' });
              
        var fileURL = URL.createObjectURL(file);
        
        window.open(fileURL, '_blank');
      }
    );
  }
}
