import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AutenticazioneService } from './autenticazione.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(private authService: AutenticazioneService, private route: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state:  RouterStateSnapshot)  {
    console.log(this.authService.isLogged())
    if (!this.authService.isLogged())
    {
      this.route.navigate(['login']);
      return false;
    }
    else 
    {
      return true;
    }
  }


}
