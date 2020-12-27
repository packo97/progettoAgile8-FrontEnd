import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { PrenotazioneComponent } from './prenotazione/prenotazione.component';
import {HomeComponent} from './home/home.component'
import { RouteGuardService } from './services/routeGuard.service';
import { CartellaClinicaComponent } from './cartella-clinica/cartella-clinica.component';
<<<<<<< HEAD
import { VistaGlobaleComponent } from './vista-globale/vista-globale.component';
=======
import { MessaggiComponent } from './messaggi/messaggi.component';
>>>>>>> 76784dee1d3bf93469e82c92f0ace69f7e5d2b19

const routes: Routes = [
  {path : 'registrazione', component : RegistrazioneComponent},
  {path : 'login', component : LoginComponent},
  {path : 'home/:whoIsLogged', component : HomeComponent,  canActivate: [RouteGuardService]},
  {path : 'cartella', component: CartellaClinicaComponent},
<<<<<<< HEAD
  {path : 'globale', component: VistaGlobaleComponent},
=======
  {path : 'messaggi', component: MessaggiComponent},
>>>>>>> 76784dee1d3bf93469e82c92f0ace69f7e5d2b19
  {path : '**', component : ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
