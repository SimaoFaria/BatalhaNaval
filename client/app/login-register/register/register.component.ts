import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';

import { User } from '../_models/user';

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

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }

    register() {
        this.loading = true;
        this.authenticationService.aux(this.model.username)
            .subscribe(result=>{
            console.log("x: aqui "+result);
                if(result ==true){
                    this.error = 'Username has already existed';
                    console.log("o user ja existe");
                    this.loading = false;
                }
        },message =>
            {
                this.authenticationService.create(this.model.username, this.model.password)
                    .subscribe(result => {
                        console.log("User criado: " + result);
                        if (result === true) {
                            this.success = 'Registration successful';
                            setTimeout(() =>
                                {
                                    this.router.navigate(['/login']);
                                    console.log("tetetetet");
                                },
                                2000);


                        }
                    });
            })
        //    ,teste =>{
        //    //this.error = 'Username or password is incorrect';
        //    this.loading = false;
        //    console.log("o user ja existe");
        //}

    }

    //
    //register() {
    //    this.loading = true;
    //        this.authenticationService.create(this.model.username, this.model.password)
    //            .subscribe( result =>{
    //                console.log("x: "+result);
    //                if (result === true){
    //                    this.getMessage();
    //                    this.success = 'Registration successful';
    //                    this.router.navigate(['/login']);
    //
    //                }            else{
    //                    this.error = 'Username or password is incorrect';
    //                    this.loading = false;
    //                }
    //            });
    //    }
}