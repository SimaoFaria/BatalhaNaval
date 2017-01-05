import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Game } from '../game-naval-battle/game';
import { GameWithoutId } from '../game-naval-battle/game';
import { GamingPlayer } from '../_models/player';
import {AuthenticationService} from "../login-register/_services/authentication.service";

@Injectable()
export class GameLobbyService {

    private gamesInRoom: Game[];

    private headers : Headers;

    private options : RequestOptions;

    private token : string;



    constructor(private http: Http,
                private auth: AuthenticationService){

        this.token = auth.token;

    }

    /*option(){
        this.headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
        this.options = new RequestOptions({ headers: headers });

        return this.options;
    }*/

    getGamesInRoom():Observable<Game[]>{

        return this.http.get('/api/v1/waiting-room-games')
            .map((response) => this.gamesInRoom = response.json());
    }

    createNewGame(game: Game):Observable<Game>{

        let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
        let options = new RequestOptions({ headers: headers });

        //console.log("qual o valor que tens " + this.token);
        return this.http.post('/api/v1/games', game, options )
            .map((response) => response.json());
    }

    updateGame(gameId: string, game: GameWithoutId):Observable<Game>{

    // updateGame(game: Game):Observable<Game>{
        return this.http.put('/api/v1/games/' + gameId, game)
            .map((response) => response.json());
    }

    deleteGame(gameId: string):Observable<Response>{

        let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete('/api/v1/games/' + gameId, options )
            .map((response) => response.json());
    }

    
    startGame(gameId: string, game: GameWithoutId):Observable<Game>{

        let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
        let options = new RequestOptions({ headers: headers });

    // updateGame(game: Game):Observable<Game>{
        return this.http.put('/api/v1/start-game/' + gameId, game, options)
            .map((response) => response.json());
    }
}