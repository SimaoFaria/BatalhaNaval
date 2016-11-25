import { Injectable } from '@angular/core';

import { Http } from '@angular/http'; 

import { Top10Player } from './top10-player';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class Top10Service {

    private top10Players: Top10Player[]

    constructor(private http: Http){}

    getTop10Victories():Observable<Top10Player[]>{
        return this.http.get('/api/v1/top10-victories')
            .map((response) => this.top10Players = response.json());
    }

    getTop10Points():Observable<Top10Player[]>{
        return this.http.get('/api/v1/top10-points')
            .map((response) => this.top10Players = response.json());
    }
}