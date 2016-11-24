import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HistoricalComponent } from './historical.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ HistoricalComponent ],
  bootstrap:    [ HistoricalComponent ]
})

export class HistoricalModule { }