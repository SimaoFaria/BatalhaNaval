import { Injectable } from '@angular/core';

import { Http } from '@angular/http'; 

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Game } from '../game-naval-battle/game';

@Injectable()
export class GameLobbyService {

    private pendingGames: Game[]

    constructor(private http: Http){}

    getPendingGames():Observable<Game[]>{
        return this.http.get('/api/v1/pending-games')
            .map((response) => this.pendingGames = response.json());
    }
}