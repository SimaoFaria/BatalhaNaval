import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { 
        //localStorage.removeItem('currentUser')
    }

    canActivate() {

        
        if (localStorage.getItem('currentUser')) {
            // logged in so return true

            console.log(localStorage.getItem('currentUser'));
            return true;
        }

        // not logged in so redirect to login page
        console.log("antes do login");
        //this.router.navigate(['/login']);
        console.log("depois do login");
        return false;
    }
}