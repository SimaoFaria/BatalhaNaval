import { Injectable } from '@angular/core';
import { Http, Response, Headers,RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

    private token:string
    private url:string =  'http://localhost:8080/api/v1/login';

    user:any

    constructor(private http: Http) { }

    login(username:any, password:any):Observable<any>{
        let json = {
            username:username,
            password:password
        }
        return this.http.post(this.url,json)
            .map((response:Response) => {
                let user = response.json();
                this.token = user.token;
                localStorage.setItem('currentUser',JSON.stringify(user));
                this.user = user;
                return user;
            })
    }

    getPlayers():Observable<any>{

        let headers = new Headers({ 'Authorization': 'Bearer '+this.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.get('http://localhost:8080/api/v1/players',options)
            .map((response) => {return response.json()});
    }
}