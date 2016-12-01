import { Component } from '@angular/core';
    
import { Game } from '../game-naval-battle/game';
import { GameLobbyService } from './game-lobby.service';
import { GamingPlayer } from '../models/player';

@Component({
    moduleId: module.id,
    selector: 'my-game-lobby',
    templateUrl: './game-lobby.html',
    styleUrls: [ './game-lobby.css'],
    providers: [ GameLobbyService]
})

export class GameLobbyComponent{

    pendingGames:Game[];

    constructor(private pendingGamesService: GameLobbyService) { 

        this.pendingGamesService.getPendingGames()
            .subscribe((leaderboard) => this.pendingGames = leaderboard);
    }

    createGame() {

        let player: GamingPlayer = {
            "username" : "Mario",
            "score" : 0,
            "classification" : ""
        };

        /*let game: Game = {
            "status" : "pending",
            "createdBy" : player.username,
            "aborted" : false,
            "startDate" : "DATA A POR",
            "endDate" : "DATA A POR",
            "winner" : "",
            "players" : [ 
                {
                    "username" : player.username,
                    "score" : player.score,
                    "classification" : player.classification
                }
            ]
        };*/

        //DUVIDA: onde se lida com a atualização no gameLobby com este novo jogo criado?

        /*this.pendingGamesService.createNewGame(game)
            .subscribe((response) => response);*/
    }

    enterGame() {

        let player: GamingPlayer = {
            "username" : "Mario",
            "score" : 0,
            "classification" : ""
        };

        let gameId: string = "";

        this.pendingGamesService.enterGame(gameId, player)
            .subscribe((response) => response);
    }
 }