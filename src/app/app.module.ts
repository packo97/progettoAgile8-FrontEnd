import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { ErrorComponent } from './error/error.component';

import {RegistrazioneService} from 'src/app/services/registrazione.service';
import {LoginService} from 'src/app/services/login.service';
import {DottoreService} from 'src/app/services/dottore.service'

import {RouteGuardService} from 'src/app/services/routeGuard.service';
import {AutenticazioneService} from 'src/app/services/autenticazione.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { HomeService} from 'src/app/services/home.service';
import { PrenotazioneService} from 'src/app/services/prenotazione.service'
import { PrenotazioneComponent } from './prenotazione/prenotazione.component';
import { DettagliPrenotazioneComponent } from './dettagli-prenotazione/dettagli-prenotazione.component';
import { RichiestaPrenotazioneComponent } from './richiesta-prenotazione/richiesta-prenotazione.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GestioneRichiestePrenotazioniComponent } from './gestione-richieste-prenotazioni/gestione-richieste-prenotazioni.component';
  
import { CalendarModule } from 'primeng/calendar';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {CheckboxModule} from 'primeng/checkbox';

@NgModule({
  declarations: [								
    AppComponent,
      RegistrazioneComponent,
      ErrorComponent,
      LoginComponent,
      HomeComponent,
      PrenotazioneComponent,
      DettagliPrenotazioneComponent,
      RichiestaPrenotazioneComponent,
      GestioneRichiestePrenotazioniComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CollapseModule.forRoot(),
    BrowserAnimationsModule,
    NgbModule,
    DragDropModule,
    CalendarModule,
    ButtonModule,
    ToastModule,
    CheckboxModule
  ],
  providers: [RegistrazioneService, LoginService, PrenotazioneService, DottoreService, AutenticazioneService, RouteGuardService, HomeService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
