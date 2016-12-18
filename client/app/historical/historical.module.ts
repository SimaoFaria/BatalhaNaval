import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";

/**
* Components
* */
import { HistoricalComponent } from './historical.component';

/**
 * Services
 * */
import { HistoricalService } from "./services/historical.service";
import { StatisticsService } from "../services/statistics/statistics.service";

/**
 * PrimefaceNG
 *  {@link http://www.primefaces.org/primeng/#/chart/pie | 2016.12.18}
 * */
import { ChartModule } from "primeng/components/chart/chart.js";


@NgModule({
    imports: [ BrowserModule, FormsModule, ChartModule ],
    declarations: [ HistoricalComponent ],
    providers: [ HistoricalService, StatisticsService ]
})

export class HistoricalModule { }