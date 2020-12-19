import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AutenticazioneService } from './autenticazione.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(private authService: AutenticazioneService, private route: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state:  RouterStateSnapshot)  {
  
    if (!this.authService.isLogged(route.params['whoIsLogged']))
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
