import { Injectable } from '@angular/core';

import { Http } from '@angular/http'; 

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Game } from '../game-naval-battle/game';
import { GamingPlayer } from '../models/player';

@Injectable()
export class GameLobbyService {

    private pendingGames: Game[]

    constructor(private http: Http){}

    getPendingGames():Observable<Game[]>{
        return this.http.get('/api/v1/pending-games')
            .map((response) => this.pendingGames = response.json());
    }

    createNewGame(game: Game):Observable<Game>{
        return this.http.post('/api/v1/games', game)
            .map((response) => response.json());
    }

    enterGame(gameId: string, player: GamingPlayer):Observable<Game>{
        return this.http.put('/api/v1/games:id', gameId, player)
            .map((response) => response.json());
    }
}