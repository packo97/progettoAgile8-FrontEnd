/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VistaGlobaleComponent } from './vista-globale.component';

describe('VistaGlobaleComponent', () => {
  let component: VistaGlobaleComponent;
  let fixture: ComponentFixture<VistaGlobaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaGlobaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaGlobaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
