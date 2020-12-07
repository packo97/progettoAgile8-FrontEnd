import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { ErrorComponent } from './error/error.component';

import {MyServiceService} from 'src/app/services/my-service.service';
import {LoginService} from 'src/app/services/login.service';

import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [			
    AppComponent,
      RegistrazioneComponent,
      ErrorComponent,
      LoginComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [MyServiceService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }