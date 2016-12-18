import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';

import { User } from '../_models/user';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    user: User;
    loading = false;
    error = '';
    success = '';
    players:any[]=[];
    username:string;
    password:string;
    hasLogged: any;


    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) {

        this.hasLogged = authenticationService.hasLogged;


        }

    //ngOnInit() {
    //
    //
    //    console.log("antes do logout no login.component");
    //    this.authenticationService.logout();
    //
    //    console.log("depois do logout no login.component");
    //}

    loginClick() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                console.log(result);
                if (result === true) {

                    this.router.navigate(['/game-lobby']);
                }
            },error =>
            {this.error = 'Username or password is incorrect' ;
                this.loading = false});
    }

    //logout() {
    //
    //
    //    console.log("antes do logout no login.component");
    //    this.authenticationService.logout();
    //
    //    console.log("depois do logout no login.component");
    //}

}
