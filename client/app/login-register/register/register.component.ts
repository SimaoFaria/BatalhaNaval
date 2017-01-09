import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';

@Component({
    moduleId: module.id,
    selector: 'register',
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;
    error = '';
    success ='';
    hasLogged: any;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) {
            this.hasLogged = this.authenticationService.hasLogged;
    }

    register() {
        console.log("this.model.email "+this.model.email);
        console.log("this.model.username "+this.model.username);
        console.log("this.model.password "+this.model.password);

        this.loading = true;
        this.authenticationService.getIfUserExist(this.model.username)
            .subscribe(result=>{
                //console.log("x: aqui "+result);
                if(result ==true){
                    this.error = 'Username is already exist';
                    console.log("o user ja existe");
                    this.loading = false;
                }
            },message =>
            {

                this.authenticationService.create(this.model.username, this.model.password, this.model.email, this.model.confirmPassword)
                    .subscribe(result => {
                        console.log("email: " + result);
                        if (result === true) {

                            this.error ='';
                            this.success = 'Registration successful';
                            setTimeout(() =>
                                {
                                    this.router.navigate(['/login']);
                                },
                                2000);
                        }
                    },error =>
                    {
                        this.error = 'Something is wrong. Repeat your log in' ;
                        this.loading = false;
                    });
            });

    }

}