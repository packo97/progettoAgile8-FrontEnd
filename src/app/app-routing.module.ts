import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { PrenotazioneComponent } from './prenotazione/prenotazione.component';
import {HomeComponent} from './home/home.component'
import { RouteGuardService } from './services/routeGuard.service';

const routes: Routes = [
  {path : 'registrazione', component : RegistrazioneComponent},
  {path : 'login', component : LoginComponent},
  {path : 'home/:whoIsLogged', component : HomeComponent,  canActivate: [RouteGuardService]},
  {path : '**', component : ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
