import { Component } from '@angular/core';
    
import { Game, PlayerStateGame, GameStatus } from '../game-naval-battle/game';
import { GameWithoutId } from '../game-naval-battle/game';
import { GameLobbyService } from './game-lobby.service';
import { GamingPlayer } from '../_models/player';
import {AuthenticationService} from "../login-register/_services/authentication.service";

@Component({
    moduleId: module.id,
    selector: 'my-game-lobby',
    templateUrl: './game-lobby.html',
    styleUrls: [ './game-lobby.css'],
    providers: [ GameLobbyService]
})

export class GameLobbyComponent{

    gamesInRoom:Game[];

    hasLogged: string;

    // Workaround do players.length
    // criar esta prop

    player: GamingPlayer = {
        "username" : JSON.parse(localStorage.getItem('currentUser')).username,
        "score" : 0,
        "classification" : ""
    };

    constructor(private gameInRoomService: GameLobbyService, private auth : AuthenticationService) {



        this.gameInRoomService.getGamesInRoom()
            .subscribe((gamesInRoom) => {
                this.gamesInRoom = gamesInRoom;
            });
    }



    createGame() {

        let newGame: Game = {
            "_id" : undefined,
            "status" : PlayerStateGame.gameStatus_toString(GameStatus.INWAITINGROOM),
            "createdBy" : this.player.username,
            "aborted" : false,
            "startDate" : new Date(),
            "endDate" : null,
            "winner" : "",
            "players" : [ 
                {
                    "username" : this.player.username,
                    "score" : this.player.score,
                    "classification" : this.player.classification
                }
            ]
        };

        this.gameInRoomService.createNewGame(newGame)
            .subscribe((game: Game) => {     

                console.log(game);

                this.gamesInRoom.push(game);
            }
        );
    }

    removeGame(game: Game) {

        if(this.player.username !== game.createdBy) {
            console.log("Player '" + this.player.username + "' não tem permissão para remover o jogo(createdBy: '" + game.createdBy + "')")
        } else {
            this.gameInRoomService.deleteGame(game._id)
                .subscribe((response) => {     
                    
                    if(response.ok) {
                        //console.log(this.gameInRoom.indexOf(game));

                        let gameIndex : number = this.gamesInRoom.indexOf(game);

                        this.gamesInRoom.splice( gameIndex, 1);
                    }
                }
            );
        }
    }

    enterGame(game: Game) {

        let gameToUpdate : Game = new Game(game);
        gameToUpdate.players.push(this.player);

        this.gameInRoomService.enterGame(game._id, gameToUpdate)
            .subscribe((response: any) => {     
                
                console.log(response)

                if (!response.ok) {
                    alert(response.message)
                } else {
                    // game = response.game;
                    game.players = response.game.players;
                }
            }
        );
    }

    leaveGame(game: Game) {

        let gameToUpdate : Game = new Game(game);
        let playerIndex : number = gameToUpdate.players.indexOf(this.player);
        gameToUpdate.players.splice( playerIndex, 1);

        this.gameInRoomService.leaveGame(game._id, gameToUpdate)
            .subscribe((response: any) => {     
                
                console.log(response)

                if (!response.ok) {
                    alert(response.message)
                } else {
                    // game = response.game;
                    game.players = response.game.players;
                }
            }
        );
    }

    startGame(game: Game) {
    
        let gameToStart : Game = new Game(game);
        gameToStart.status = PlayerStateGame.gameStatus_toString(GameStatus.PENDING);

        this.gameInRoomService.startGame(game._id, gameToStart)
            .subscribe((response: any) => {

            });
    }

    playerIn(game: Game): boolean {

        let exists: boolean = false;

        for(let player of game.players) {
            if(player.username == this.player.username) {
                exists = true;
                break;
            }
        }

        return exists;
    }
}