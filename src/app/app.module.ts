import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { ErrorComponent } from './error/error.component';

import {RegistrazioneService} from 'src/app/services/registrazione.service';
import {LoginService} from 'src/app/services/login.service';
import {DottoreService} from 'src/app/services/dottore.service'

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { PrenotazioneService} from 'src/app/services/prenotazione.service'
import { PrenotazioneComponent } from './prenotazione/prenotazione.component';

@NgModule({
  declarations: [					
    AppComponent,
      RegistrazioneComponent,
      ErrorComponent,
      LoginComponent,
      HomeComponent,
      PrenotazioneComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [RegistrazioneService, LoginService, PrenotazioneService, DottoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
