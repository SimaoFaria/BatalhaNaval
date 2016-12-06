import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http'; 

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Game } from '../game-naval-battle/game';
import { GameWithoutId } from '../game-naval-battle/game';
import { GamingPlayer } from '../models/player';

@Injectable()
export class GameLobbyService {

    private gamesInRoom: Game[]

    constructor(private http: Http){}

    getGamesInRoom():Observable<Game[]>{
        return this.http.get('/api/v1/waiting-room-games')
            .map((response) => this.gamesInRoom = response.json());
    }

    createNewGame(game: Game):Observable<Game>{
        return this.http.post('/api/v1/games', game)
            .map((response) => response.json());
    }

    updateGame(gameId: string, game: GameWithoutId):Observable<Game>{
    // updateGame(game: Game):Observable<Game>{
        return this.http.put('/api/v1/games/' + gameId, game)
            .map((response) => response.json());
    }

    deleteGame(gameId: string):Observable<Response>{
        return this.http.delete('/api/v1/games/' + gameId)
            .map((response) => response.json());
    }

    
    startGame(gameId: string, game: GameWithoutId):Observable<Game>{
    // updateGame(game: Game):Observable<Game>{
        return this.http.put('/api/v1/start-game/' + gameId, game)
            .map((response) => response.json());
    }
}