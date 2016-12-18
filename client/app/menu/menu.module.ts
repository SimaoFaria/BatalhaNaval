//TODO: (o componente é logo desenhado ao iniciar a a app por isso tem de se declarar o componente no declare logo nao pode ter no declare do module do menu)

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