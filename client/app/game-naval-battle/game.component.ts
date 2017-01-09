import { Component } from '@angular/core';

import { GameService } from './../services/game.service';

import {PlayerStateGame, GameStatus} from './game';

import {Tabuleiro} from "./tabuleiro";
import {TipoNavio, Orientacao} from "./navio";
import {BoardDefense} from "./models/board-defense";


import {WebSocketService } from '../sockets/notifications/websocket.service';
import {AuthenticationService} from "../login-register/_services/authentication.service";
import {BoardAttack} from "./models/board-attack";

@Component({
  moduleId: module.id,
  selector: 'my-game',
  templateUrl: './game.html',
  styleUrls: [
    './game-attack.css',
    './game-defend.css'
  ]
})

export class GameComponent {

    private _username : string;

    COLUMNS : number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    LINES : string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

    private playerStateGame: PlayerStateGame[];

  private tabuleiro: Tabuleiro;


    constructor(
                private gameService: GameService,
                private websocketService: WebSocketService,
                private authenticationService : AuthenticationService) {


        this._username = JSON.parse(localStorage.getItem('currentUser')).username;

        this.gameService.setUsername(this._username);

        this.playerStateGame = [];

        this.tabuleiro = new Tabuleiro();        


        this.gameService.getCurrentStateGames(this._username)
            .subscribe((response: any) => {

                // console.log("------ No CLIENTE -------");
                // console.dir(response);
                // console.log("------ FIM No CLIENTE -------");

                this.playerStateGame = response;


                //this.playerStateGame[0].boardDefense.adicionaNavio(TipoNavio.PortaAvioes, Orientacao.Normal, 'A', 1);

                // console.log("------ No CLIENTE -------");
                // console.dir(this.playerStateGame );
                // console.log("------ FIM No CLIENTE -------");



                 // ----

                this.playerStateGame.forEach((game) => {
                    this.websocketService.joinGameRoom(game.idGame);
                });
                
                this.websocketService.getGameState('change game state')
                .subscribe( (json: PlayerStateGame[]) => {
                    
                    console.log("OBTEU JOGO POR SOCKET");
                    // console.log("OBTEU JOGO POR SOCKET");
                    
                    json.forEach((jsonGame) => {
                        this.playerStateGame.forEach((myGame) => {

                            if (myGame.idGame === jsonGame.idGame
                                && this._username === jsonGame.username) {

                                // myGame = jsonGame;
                                myGame.status = jsonGame.status;
                                // myGame.status = jsonGame.status = 'INPROGRESS';

                                // console.log(myGame.status)
                                // console.log(jsonGame.status)

                            }
                        });
                    });
                    console.log("/OBTEU JOGO POR SOCKET");
                    // console.log("/OBTEU JOGO POR SOCKET");
                });

                this.websocketService.getCurrentPlayer('update current player')
                .subscribe( (json: any) => {
                    
                    console.log("OBTEU update current player POR SOCKET");

                    this.playerStateGame.forEach((myGame) => {
                        if (myGame.idGame === json.idGame) {
                            myGame.currentPlayer = json.currentPlayer;
                            myGame.nrShotsRemaining = json.nrShotsRemaining;

                            console.log(myGame.currentPlayer + '|' + myGame.nrShotsRemaining)
                            console.log(json.currentPlayer + '|' + json.nrShotsRemaining)
                        }
                    });

                    console.log("/OBTEU update current player POR SOCKET");
                    
                });

                this.websocketService.getCurrentPlayer('update game status')
                .subscribe( (json: any) => {
                    
                    console.log("OBTEU update game status POR SOCKET");

                    // console.log(json)
                    // console.log(this._username)

                    if (this._username === json.username) {
                        // console.log('SOU EU')
                        this.playerStateGame.forEach((myGame) => {
                            if (myGame.idGame === json.idGame) {
                                // console.log('É O MEU JOGO')
                                // myGame = json;
                                myGame.status = json.status;
                                // console.log(myGame.status)
                                // console.log(json.status)
                            }
                        });
                    } else if (json.username !== this._username) {
                        this.playerStateGame.forEach((game) => {
                            if (game.idGame === json.idGame) {
                                game.boardsAttack.forEach((boardAttack) => {
                                    if(boardAttack.username === json.username) {
                                        boardAttack.stillInGame = false;
                                    }
                                });
                            }
                        });
                    }

                    console.log("/OBTEU update game status POR SOCKET");
                    
                });

            });


    }

    addNavioToBoardDefense(idGame : string) : void {

        document.getElementById('msgerro').innerText='';
        try {
            let tipo = (document.getElementById('tiponavio') as any).value;
            let orient = (document.getElementById('orientacao') as any).value;
            let linha =  (document.getElementById('linha') as any).value;
            if (['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].indexOf(linha) < 0){
                throw Error("Linha Inválida");
            }

            let coluna =  (document.getElementById('coluna') as any).value;
            let tipoNavio = TipoNavio.PortaAvioes;
            switch (tipo) {
                case "1": tipoNavio = TipoNavio.Couracado;
                    break;
                case "2": tipoNavio = TipoNavio.Cruzador;
                    break;
                case "3": tipoNavio = TipoNavio.ContraTorpedeiro;
                    break;
                case "4": tipoNavio = TipoNavio.Submarino;
                    break;
            }
            let orientacao = Orientacao.Normal;
            switch (orient) {
                case "1": orientacao = Orientacao.Roda90;
                    break;
                case "2": orientacao = Orientacao.Roda180;
                    break;
                case "3": orientacao = Orientacao.Roda270;
                    break;
            }
            // Força cast para numero
            let col : number = +coluna;
            //this.tabuleiro.adicionaNavio(tipoNavio, orientacao, linha, col);

            for (let game of this.playerStateGame) {
                if(game.idGame == idGame) {
                    game.boardDefense.adicionaNavio(tipoNavio, orientacao, linha, col);
                }
            }


            //console.table(this.tabuleiro);

        } catch (e) {
            document.getElementById('msgerro').innerText=e;
        }

    }


    ready(game: PlayerStateGame) : void {

        if(game.boardDefense.isConfigDone() === false){
            alert("Ainda não tem as peças todas");
        }else {

            // inicio websockets
            let json = {
                myMessage: 'I\'m ready.',
                othersMessage: 'Player ' + JSON.parse(localStorage.getItem("currentUser")).username + ' is ready.'
            }
            this.websocketService.useNotifications(game.idGame + ' notifications', json);
            // fim websockets

            this.gameService.putReadyOnGame(game)
                .subscribe((games: PlayerStateGame[]) => {

                    if (game.boardsAttack.length + 1 === games.length) {
                        let json = {
                            myMessage: 'Everyone is ready',
                            othersMessage: 'Everyone is ready.'
                        }
                        this.websocketService.useNotifications(game.idGame + ' notifications', json);

                        games.forEach((g) => {
                            if (g.username === this._username) {
                                // altero o status do meu jogo
                                game.status = g.status;
                                // console.log(game.status)
                            }
                        });
                        // game.status = PlayerStateGame.gameStatus_toString(GameStatus.INPROGRESS);
                        
                        this.websocketService.alterGameState(game.idGame, games);
                    }
                });
        }

    }

    shot(idGame : string, opponentUsername : string, line : string, column : number, status: string, event) : void{

        //DEGUB
        //alert("Game " + idGame + " Shot on : " + opponentUsername + " line: " + line + " column" + column);
        //alert("username: " + this.authenticationService.username)

        if(event.target.value) {
            alert("Já atirou nessa celula.");
            return;
        }

        for(let game of this.playerStateGame) {

            if(game.idGame == idGame) {

                if (game.currentPlayer != this.authenticationService.user.username) {
                    alert("Its not your turn. Wait.")
                    return;
                } else {

                    //ver se foi tiro ?
                    let resp: string;

                    this.gameService.putHasShotCurrentStateGamePerUsernameByPosition(idGame, opponentUsername, line, column, this._username)
                        .subscribe((response: any) => {

                            //DEBUG
                            // console.log("=======> TIRO ");
                            // console.dir(response);
                            // alert("TIRO: "+ response);
                            // alert("TIRO: "+ response.shot);
                            // resp = response;

                            // this.playerStateGame = response;

                            console.log(response);
                            game.nrShotsRemaining = response.nrShotsRemaining;
                            game.currentPlayer = response.currentPlayer;

                            // console.log(response.boardAttack);

                            //codigo a funcionar com o construtor
                            let arrayBoardsAttk : BoardAttack[] = [];
                            for(let boardAtt of response.boardAttack) {
                                arrayBoardsAttk.push(new BoardAttack(boardAtt.username, boardAtt.stillInGame, boardAtt.board));
                            }
                            game.boardsAttack = arrayBoardsAttk;


                            //inicio websockets
                            let json = {
                                myMessage: 'You shot ' + response.defendingPlayer + '(' + line + ', ' + column + ') and ',
                                // othersMessage: 'Player ' + JSON.parse(localStorage.getItem("currentUser")).username + ' shot '+ response.defendingPlayer + '(' + line + ', ' + column + ') and '
                                othersMessage: 'Player ' + this._username + ' shot '+ response.defendingPlayer + '(' + line + ', ' + column + ') and '
                            }

                            if (response.shot != '') {
                                json.myMessage += 'hit ' + response.shipType + '.';
                                json.othersMessage += 'hit ' + response.shipType + '.';
                            } else {
                                json.myMessage += 'missed.';
                                json.othersMessage += 'missed.';
                            }
                            this.websocketService.useNotifications(idGame + ' notifications', json);
                            
                            if (response.sank) {
                                json.myMessage = 'Congratulations! You have sank ' + response.defendingPlayer + ' ' + response.shipType + '.';
                                // json.othersMessage = 'Player ' + JSON.parse(localStorage.getItem("currentUser")).username + ' has sank ' + response.defendingPlayer + ' ' + response.shipType + '.';
                                json.othersMessage = 'Player ' + this._username + ' has sank ' + response.defendingPlayer + ' ' + response.shipType + '.';
                                this.websocketService.useNotifications(idGame + ' notifications', json);
                            }

                            if (response.allShipsSanked) {
                                json.myMessage = 'You have sank all ' + response.defendingPlayer + ' ships.';
                                // json.othersMessage = 'Player ' + JSON.parse(localStorage.getItem("currentUser")).username + ' has sank all ' + response.defendingPlayer + ' ships.';
                                json.othersMessage = 'Player ' + this._username + ' has sank all ' + response.defendingPlayer + ' ships.';
                                this.websocketService.useNotifications(idGame + ' notifications', json);
                                

                                // manda por websocket o status ENDED ao jogador que perdeu
                                let updateJson = {
                                    idGame: idGame,
                                    username: opponentUsername,
                                    status: PlayerStateGame.gameStatus_toString(GameStatus.ENDED),
                                    // shooter: this._username
                                }
                                this.websocketService.updateGameStatus(idGame, updateJson);

                                console.log(response.gameEnded)
                                if (response.gameEnded) {

                                    // nao deveria ser assim
                                    game.status = PlayerStateGame.gameStatus_toString(GameStatus.ENDED);

                                    game.won = true;

                                    json.myMessage = 'Congratz!! You have won the game!';
                                    json.othersMessage = 'Player ' + this._username + ' has won the game.';
                                    this.websocketService.useNotifications(idGame + ' notifications', json);
                                }
                            }

                            let updateJson = {
                                idGame: idGame,
                                nrShotsRemaining: response.nrShotsRemaining,
                                currentPlayer: response.currentPlayer
                            }
                            this.websocketService.updateCurrentPlayer(idGame, updateJson);
                            // fim sockets
                        });
                }
            }
        }


    }


    limparTabuleiro(idGame : string) : void {

      document.getElementById('msgerro').innerText='';

        for (let game of this.playerStateGame) {

            if(game.idGame == idGame){

                game.boardDefense = null;
                game.boardDefense = new BoardDefense();
            }

        }
    }


    closeGame(idGame : string) : void {
        this.gameService.closeGame(idGame)
        .subscribe((response: PlayerStateGame) => { 

            console.log('INI - RESPOSTA DO CLOSEGAME')
            console.log(response)
            console.log('FIM - RESPOSTA DO CLOSEGAME')

            this.playerStateGame.forEach((stateGame) => {
                if (stateGame.idGame == response.idGame) {
                    stateGame.isPlaying = response.isPlaying;
                }
            })
        });
    }
 }