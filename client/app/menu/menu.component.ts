import { Component } from '@angular/core';
import {AuthenticationService} from "../login-register/_services/authentication.service";

@Component({
    selector: 'menu-app',
    templateUrl: './app/menu/menu.component.html'
})

export class MenuComponent {

    public hasLogged: boolean;

    constructor(
        private authenticationService: AuthenticationService) {
        this.hasLogged = authenticationService.hasLogged;
    }

    logoutClick() {
        this.authenticationService.logout();
        console.log("variavel "+this.hasLogged);

    }
}