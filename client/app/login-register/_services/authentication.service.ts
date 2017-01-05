import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { User } from '../_models/user';

import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import Observable =

@Injectable()
export class AuthenticationService {
    public token: string;
    public hasLogged : boolean;
    public username : string;
    public user:User;
    //public teste: any


    constructor(private http: Http, user:User) {
        this.user = user;
        this.hasLogged = false;
    }


    login(username: string, password: string): Observable<boolean> {
        this.user.username = username;
        this.user.password = password;

        return this.http.post('api/v1/login', this.user).map((response: Response) => {
                //console.log("token: "+response.json().token);
                let user = response.json();
                //console.log("entao "+user.username +" " +user.token);
                if (user.token && response.json().statusText == undefined) {
                    // set token property
                    let token = user.token;
                    // store username and token in local storage
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                    this.token = token;
                    this.hasLogged = true;
                    //this.teste = response.json().user;

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

        if (error.status != undefined){
            console.log("Something is wrong");
        }

        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}`
                : 'Server Error';
        console.log(errMsg);
        return false;

    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
        this.hasLogged = false;
        this.username = null;
    }

    /**
     *
     * retornar o nome do utilizador ?????????????????
     * @param username
     * @returns {any}
     */
    getUser(username:string):Observable<any>{
        //console.log(" ver: "+this.token)
        //let headers = new Headers({ 'Authorization': 'Bearer '+this.token });
        //let options = new RequestOptions({ headers: headers });

        return this.http.get('api/v1/players/'+username /*, options*/)
            .map((response) => {return response.json()});

        //return this.user;
    }

    getIfUserExist (username:string) : Observable<boolean>{
        let user;
        return this.http.get('api/v1/getUser/'+username)
            .map((response: Response)=>{
                user = response.json();
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

    create(username: string, password: string, email: string, confirmPassword:string) : Observable<boolean>{

        let user = new User();
        user.username = username;
        user.password = password;
        user.email = email;
        user.confirmPassword = confirmPassword;



        return this.http.post('api/v1/new_user', user).map((response: Response) =>{
            let userFromBD = response.json();

            if (userFromBD.username === username){

                console.log("no serviço email" + user.email);

                this.token = userFromBD.token;
                console.log("aqui " +response.json().statusText);

                return true;
            }

        }).catch((error =>this.handleError(error)));
    }

}