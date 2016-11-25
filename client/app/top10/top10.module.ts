import { NgModule }      from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { Top10Component }  from './top10.component';

import { Top10Service } from './top10.service';

@NgModule({
  imports:      [ BrowserModule, HttpModule],
  declarations: [ Top10Component ],
  providers:    [ Top10Service ],
  exports:      [ Top10Component ]
})
export class Top10Module { }