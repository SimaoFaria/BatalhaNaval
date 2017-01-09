import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppRoutingModule} from "../app-routing.module";
import {AuthenticationService} from "./_services/authentication.service";
import {RegisterComponent} from "./register/register.component";
import {User} from "./_models/user";
import {AuthGuard} from "./_guards/auth.guard";
import {LoginComponent} from "./login/login.component";
import {EqualValidator} from "./register/equal-validator";
import { BaseRequestOptions }    from '@angular/http';
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
