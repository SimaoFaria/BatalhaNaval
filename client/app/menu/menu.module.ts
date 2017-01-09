import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MenuComponent} from "./menu.component";
import {AppRoutingModule} from "../app-routing.module";

@NgModule({
    imports:      [ BrowserModule, AppRoutingModule ],
    declarations: [ MenuComponent ],
    exports: [ MenuComponent ]
})

export class MenuModule { }