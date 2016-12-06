import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { User } from '../_models/user';

import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthenticationService {
    public token: string;
    private subject : string;

    constructor(private http: Http) {
        // set token if saved in local storage
        //var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        //this.token = currentUser && currentUser.token;
    }


    login(username: string, password: string): Observable<boolean> {
        let json ={
            username:username,
            password:password
        };
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });

        return this.http.post('api/v1/login', json).map((response: Response) => {
                // login successful if there's a jwt token in the response
                console.log("token: "+response.json().token);
                let user = response.json();
                //console.log("entao "+user.username +" " +user.token);
                if (user.username === username && user.token && response.json().statusText == undefined) {
                    // set token property
                    let token = user.token;
                    // store username and token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                    this.user = user;
                    this.token = token;
                    // return true to indicate successful login
                    return true;
                }
                    // return false to indicate failed login
            }).catch((error =>this.handleError(error)));
            
    }

    private handleError (error: any){

        if(error.status == 401){
            console.log("Unauthorized");
        }

        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}`
                : 'Server Error';
        console.log(errMsg);
        return false;
        //return Observable.throw(errMsg);
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }

    //getCurrentGames(username : string):Observable<Game[]>{
    //
    //    return this.http.get('/api/v1/current-games/' + username)
    //        .map((response) => this.games = response.json());
    //
    //    //TODO
    //    //por o json num arrya de game para mandar para o cliente
    //}

    aux (username:string) : Observable<boolean>{
        let user;
        return this.http.get('api/v1/getUser/'+username)
            .map((response: Response)=>{
                user = response.json();
                console.log("x dsdf: " + user);
                return true;
            }).catch((error =>this.handleErrorNotFound(error)));

    }


    private handleErrorNotFound (error: any){

        if(error.status == 404){
            console.log("NotFound");
        }

        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}`
                : 'Server Error';
        console.log(errMsg);
        return false;
        //return Observable.throw(errMsg);
    }

    create(username: string, password: string) : Observable<boolean>{
        let json ={
            username:username,
            password:password
        };

        return this.http.post('api/v1/players', json).map((response: Response) =>{
            let userFromBD = response.json();

            if (userFromBD.username === username){

                this.token = userFromBD.token;
                console.log(this.token);
                return true;
            }
            else{
                return false;
            }

        });
    }

    success(message: string) {
        //this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'success', text: message });
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}