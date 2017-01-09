import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { 

    }

    canActivate() {

        if (localStorage.getItem('currentUser')) {
            // logged in so return true

            console.log(localStorage.getItem('currentUser'));
            return true;
        }

        this.router.navigate(['/login']);
        //console.log("depois do login");
        return false;
    }
}