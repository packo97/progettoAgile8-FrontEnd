import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeFirstComponentFunction: EventEmitter<string> = new EventEmitter();    
  subsVar: Subscription;    
    
  constructor() { }    
    
  //viene chiamato quando una data nel full calendar è cliccata
  onFirstComponentButtonClick(date: string) {    
    this.invokeFirstComponentFunction.emit(date);    
  }    

}
