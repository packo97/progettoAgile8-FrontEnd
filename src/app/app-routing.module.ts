import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { ErrorComponent } from './error/error.component';


const routes: Routes = [
  {path  : 'registrazione', component : RegistrazioneComponent},
  {path : '**', component : ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
