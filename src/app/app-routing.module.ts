import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component'
import { RouteGuardService } from './services/routeGuard.service';
import { CartellaClinicaComponent } from './cartella-clinica/cartella-clinica.component';
import { VistaGlobaleComponent } from './vista-globale/vista-globale.component';
import { MessaggiComponent } from './messaggi/messaggi.component';
import { InfoAccountComponent } from  './info-account/info-account.component';
import { RecuperaPasswordComponent } from './recupera-password/recupera-password.component';


const routes: Routes = [
  {path : 'registrazione', component : RegistrazioneComponent},
  {path : '', component : LoginComponent},
  {path : 'login', component : LoginComponent},
  {path : 'recuperaPassword', component : RecuperaPasswordComponent},
  {path : 'home/:whoIsLogged', component : HomeComponent,  canActivate: [RouteGuardService]},
  {path : 'cartella', component: CartellaClinicaComponent},
  {path : 'globale', component: VistaGlobaleComponent},
  {path : 'messaggi', component: MessaggiComponent},
  {path : 'account', component : InfoAccountComponent},
  {path : '**', component : ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
