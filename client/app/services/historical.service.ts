import { Injectable } from '@angular/core';

import { Player } from '../models/player';
import { Login } from '../models/login';
import { Historical } from '../historical/historical';
import { HISTORICALS } from '../mock/mock-historical';

import { Http } from '@angular/http'; 

import { Observable } from 'rxjs/Observable';

@Injectable()
export class HistoricalService {

    /*getHistorical(): Promise<Historical[]> {
        return Promise.resolve(HISTORICALS);
    }*/

    private historicals: Historical[]

    constructor(private http: Http){}

    getHistorical():Observable<Historical[]>{
        return this.http.get('/api/v1/historicals')
            .map((response) => this.historicals = response.json());
    }

    
    getMyHistorical(username : string):Observable<Historical[]>{
        return this.http.get('/api/v1/historicals/'+username)
            .map((response) => this.historicals = response.json());
    }

}