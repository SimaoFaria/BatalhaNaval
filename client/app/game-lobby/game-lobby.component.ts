import { Component } from '@angular/core';
    
import { Game, PlayerStateGame, GameStatus } from '../game-naval-battle/game';
import { GameWithoutId } from '../game-naval-battle/game';
import { GameLobbyService } from './game-lobby.service';
import { GamingPlayer } from '../_models/player';

@Component({
    moduleId: module.id,
    selector: 'my-game-lobby',
    templateUrl: './game-lobby.html',
    styleUrls: [ './game-lobby.css'],
    providers: [ GameLobbyService]
})

export class GameLobbyComponent{

    gamesInRoom:Game[];

    // Workaround do players.length
    // criar esta prop

    player: GamingPlayer = {
        "username" : JSON.parse(localStorage.getItem('currentUser')).username,
        "score" : 0,
        "classification" : ""
    };

    constructor(private gameInRoomService: GameLobbyService) { 

        this.gameInRoomService.getGamesInRoom()
            .subscribe((gamesInRoom) => {
                this.gamesInRoom = gamesInRoom;
                // console.log(gamesInRoom);

                /* este workaround não serve
                this.totalPlayers = [];
                this.gamesInRoom.forEach((game) => {
                    this.totalPlayers.push(game.players.length);
                });*/
            });
    }

    createGame() {

        let newGame: Game = {
            "_id" : undefined,
            "status" : PlayerStateGame.gameStatus_toString(GameStatus.INWAITINGROOM),
            "createdBy" : this.player.username,
            "aborted" : false,
            "startDate" : new Date(Date.now()).toLocaleString(), //TODO não está a mandar as nossas horas corretas
            "endDate" : "",
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

        this.gameInRoomService.updateGame(game._id, gameToUpdate)
            .subscribe((game2) => {     
                
                // TODO a atualizaçao

                // console.log(game2);
                // console.log(this.gamesInRoom);

                //  let gameIndex : number = this.gamesInRoom.indexOf(game);
                // console.log(gameIndex);

                // DUVIDA: porque que é que esta abordagem não funciona?
                // this.gamesInRoom[gameIndex] = game;
                // this.gamesInRoom.;
                
                // this.gamesInRoom[gameIndex].players.push(this.player);
                
                // meh~
                // if (gameToUpdate.players === game.players) {
                //     this.gamesInRoom[gameIndex].players.push(this.player);
                // }
            }
        );
    }

    leaveGame(game: Game) {

        let gameToUpdate : Game = new Game(game);

        /*
        //necessito fazer isto para não perder o acesso do this.player dentro do map feito aseguir
        let playerTest: GamingPlayer = this.player;
        
        gameToUpdate.players = 
        //não funciona para < IE9
        gameToUpdate.players.filter(function(pl){ 
            return pl.username !== playerTest.username; 
        });
        */

        let playerIndex : number = gameToUpdate.players.indexOf(this.player);

        console.log(playerIndex);
        console.log(gameToUpdate.players);

        gameToUpdate.players.splice( playerIndex, 1);
        console.log(gameToUpdate.players);

        this.gameInRoomService.updateGame(game._id, gameToUpdate)
            .subscribe((response) => {     
                
                /** TODO||DUVIDA
                 *  porque é que a vista nao é atualizada?
                 *  como atualizar os *ngIfs?
                 */
                game = response

                console.log(game);
            }
        );
    }

    startGame(game: Game) {
    
        let gameToStart : Game = new Game(game);

        gameToStart.status = PlayerStateGame.gameStatus_toString(GameStatus.PENDING);

        this.gameInRoomService.startGame(game._id, gameToStart)
            .subscribe((game) => { });
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