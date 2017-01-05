import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MenuComponent} from "./menu.component";
import {AppRoutingModule} from "../app-routing.module";
import {HistoricalModule} from "../historical/historical.module";
import {AuthService} from "../sockets/auth.service";
import {AuthenticationService} from "./_services/authentication.service";
import {RegisterComponent} from "./register/register.component";
import {User} from "./_models/user";
import {AuthGuard} from "./_guards/auth.guard";
import {LoginComponent} from "./login/login.component";
import {EqualValidator} from "./register/equal-validator";
import {GameLobbyComponent} from "../game-lobby/game-lobby.component";
import { HttpModule, BaseRequestOptions }    from '@angular/http';
import { FormsModule }   from '@angular/forms';
import {ROUTES} from "../routes";
import { RouterModule } from '@angular/router';


@NgModule({
    imports:      [
        BrowserModule,
        RouterModule.forRoot(ROUTES),
        FormsModule,
        AppRoutingModule,
    ],
    declarations: [
        EqualValidator,
        LoginComponent,
        RegisterComponent
    ],
    providers: [
        AuthenticationService,
        AuthGuard,
        User,
        BaseRequestOptions ],
    exports:  [
        LoginComponent,
        RouterModule ]
})

export class LoginModule { }
