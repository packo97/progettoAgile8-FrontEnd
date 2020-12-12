/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GestioneRichiestePrenotazioniComponent } from './gestione-richieste-prenotazioni.component';

describe('GestioneRichiestePrenotazioniComponent', () => {
  let component: GestioneRichiestePrenotazioniComponent;
  let fixture: ComponentFixture<GestioneRichiestePrenotazioniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestioneRichiestePrenotazioniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestioneRichiestePrenotazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
