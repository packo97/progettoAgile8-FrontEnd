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
    public content: any
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

  whoIsLogged: string;

  animaleSelezionato: Animale;



  constructor(private dialogService: DialogService,private prenotazioneService: PrenotazioneService, private homeService: HomeService, private pazienteService: PazienteService, private animaleService: AnimaleService, private messageService: MessageService, private fileService: FileService) { }

  ngOnInit() {


    this.whoIsLogged = sessionStorage.getItem("profile");
    if(this.whoIsLogged=="paziente"){
      this.homeService.getPaziente(sessionStorage.getItem("user")).subscribe(
        response => {
          console.log(response);
          this.pazienteSelezionato = response;
          //solo il primo per ora
          this.loadAnimale(response.animale);
          
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
        }
          
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
    for(let r of response)
      r.data_nascita = new Date(r.data_nascita);

    if(response.length>0){
      this.pazienteSelezionato.animale = response;
      this.animaleSelezionato = this.pazienteSelezionato.animale[0];
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
  bloccata: boolean;
  slotLiberi: string[] = [];
  slotSelezionato: string;

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
}
