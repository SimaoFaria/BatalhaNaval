import { Component, OnInit } from '@angular/core';

import { GameService } from './../services/game.service';

import {Game, PlayerStateGame, GameStatus, CellAttack} from './game';

import {Tabuleiro} from "./tabuleiro";
import {TipoNavio, Orientacao, Navio} from "./navio";
import {TipoCelula} from "./celula";
import {Posicao} from "./posicao";
import {BoardDefense} from "./models/board-defense";


import {WebSocketService } from '../sockets/notifications/websocket.service';
import {AuthenticationService} from "../login-register/_services/authentication.service";

@Component({
  moduleId: module.id,
  selector: 'my-game',
  templateUrl: './game.html',
    // styles: [`.selected {
    //   background-color: #CFD8DC !important;
    //   color: white;
    // }`]
  styleUrls: [
    './game-attack-simao.css',
    './game-defend-simao.css'
  ]
})

//TODO: watting, pedding, ongoing, ended

export class GameComponent {

    private _username : string;

    COLUMNS : number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    LINES : string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

    private playerStateGame: PlayerStateGame[];

  //private games : Game[];
  private tabuleiro: Tabuleiro;

  //private celulas : number[][];

    constructor(
                private gameService: GameService,
                private websocketService: WebSocketService,
                private authenticationService : AuthenticationService) {

        //document.getElementById('container').innerText='';


        // this._username = 'Cao de Agua';// = JSON.parse(localStorage.getItem('currentUser')); //TODO passar para o login
        this._username = JSON.parse(localStorage.getItem('currentUser')).username;
        
        //DUVIDA(simão) => porquê?
        this.gameService.setUsername(this._username);

        this.playerStateGame = [];

        this.tabuleiro = new Tabuleiro();        

        //TODO so para testar
        let value : number = 12;
        // let username : string;
        // username = 'Cao de Agua';

        /*this.gameService.getCurrentGames(username)
                .subscribe((response) => this.games = response);*/


        this.gameService.getCurrentStateGames(this._username)
            .subscribe((response: any) => {

                // console.log("------ No CLIENTE -------");
                // console.dir(response);
                // console.log("------ FIM No CLIENTE -------");

                this.playerStateGame = response;

                // this.playerStateGame.forEach((game) => {
                    
                // });


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
                                myGame.status = json.status;
                                // console.log(myGame.status)
                                // console.log(json.status)
                            }
                        });
                    }

                    console.log("/OBTEU update game status POR SOCKET");
                    
                });

            });

        //desenhaTabuleiro();
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

            //this.games.getTabuleiroDefesaByID(_id).adicionaNavio(tipoNavio, orientacao, linha, col);

            //console.table(this.tabuleiro);

            //this.desenhaTabuleiro();
        } catch (e) {
            document.getElementById('msgerro').innerText=e;
        }

    }


    // addNavio(_id : string) : void {
    //   console.log("add navio");
    //
    //   document.getElementById('msgerro').innerText='';
    //   try {
    //       let tipo = (document.getElementById('tiponavio') as any).value;
    //       let orient = (document.getElementById('orientacao') as any).value;
    //       let linha =  (document.getElementById('linha') as any).value;
    //       if (['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].indexOf(linha) < 0){
    //           throw Error("Linha Inválida");
    //       }
    //
    //       let coluna =  (document.getElementById('coluna') as any).value;
    //       let tipoNavio = TipoNavio.PortaAvioes;
    //       switch (tipo) {
    //           case "1": tipoNavio = TipoNavio.Couracado;
    //               break;
    //           case "2": tipoNavio = TipoNavio.Cruzador;
    //               break;
    //           case "3": tipoNavio = TipoNavio.ContraTorpedeiro;
    //               break;
    //           case "4": tipoNavio = TipoNavio.Submarino;
    //               break;
    //       }
    //       let orientacao = Orientacao.Normal;
    //       switch (orient) {
    //           case "1": orientacao = Orientacao.Roda90;
    //               break;
    //           case "2": orientacao = Orientacao.Roda180;
    //               break;
    //           case "3": orientacao = Orientacao.Roda270;
    //               break;
    //       }
    //       // Força cast para numero
    //       let col : number = +coluna;
    //       this.tabuleiro.adicionaNavio(tipoNavio, orientacao, linha, col);
    //       //this.games.getTabuleiroDefesaByID(_id).adicionaNavio(tipoNavio, orientacao, linha, col);
    //
    //       //console.table(this.tabuleiro);
    //
    //       //this.desenhaTabuleiro();
    //   } catch (e) {
    //       document.getElementById('msgerro').innerText=e;
    //   }
    //
    // }


    // ready(idGame: string) : void {

    //     for(let game of this.playerStateGame) {

    //         if(game.idGame == idGame) {

    //             if(game.boardDefense.isConfigDone() === false){
    //                 alert("Ainda não tem as peças todas");
    //             }else {

    //                 // alert("Começar jogo");

    //                 //console.log(game);

    //                 //TODO SIMAO estou a usar o websocket aqui uma vez que não dá para trabalhar o response(o gameService devolve o response como undefined)
    //                 // inicio websockets
    //                 let json = {
    //                     myMessage: 'I\'m ready.',
    //                     othersMessage: 'Player ' + JSON.parse(localStorage.getItem("currentUser")).username + ' is ready.'
    //                 }
    //                 this.websocketService.useNotifications(idGame + ' notifications', json);
    //                 // fim websockets

    //                 //TODO SIMAO nao faz sentido mudar aqui, so no ultimo a fazer ready ou no gajo que comece o jogo
    //                 // game.status = PlayerStateGame.gameStatus_toString(GameStatus.INPROGRESS);
    //                 game.status = PlayerStateGame.gameStatus_toString(GameStatus.READY);

    //                 this.gameService.putCurrentStateGames(game, true)
    //                     .subscribe((response: any) => {


    //                         console.log("response do READY");
    //                         console.log(response);
    //                         console.log("/response do READY");
                        
    //                         // this.websocketService

    //                         // this.playerStateGame = response; //TODO
    //                         //
    //                         // console.log("esperaça!!!");
    //                         // console.log(this.playerStateGame);
    //                         // console.log("fim da esperaça!!!");
    //                         //
    //                         // console.dir(this.playerStateGame[0].boardDefense.navios);

    //                         //this.playerStateGame[0].boardDefense.adicionaNavio(TipoNavio.PortaAvioes, Orientacao.Normal, 'A', 1);
    //                     });
    //             }
    //         }
    //     }






    //     // for (let game of this.playerStateGame) {
    //     //     if(game.idGame == idGame) {
    //     //
    //     //         //enivas as cenas para a bd
    //     //         this.gameService.putCurrentStateGames(game)
    //     //             .subscribe((response) => {
    //     //
    //     //                 // this.playerStateGame = response;
    //     //                 //
    //     //                 // console.log("esperaça!!!");
    //     //                 // console.log(this.playerStateGame);
    //     //                 // console.log("fim da esperaça!!!");
    //     //                 //
    //     //                 // console.dir(this.playerStateGame[0].boardDefense.navios);
    //     //
    //     //                 //this.playerStateGame[0].boardDefense.adicionaNavio(TipoNavio.PortaAvioes, Orientacao.Normal, 'A', 1);
    //     //
    //     //
    //     //         });
    //     //
    //     //         //break; //TODO avriguar a situation
    //     //     }
    //     // }



    //     //se tudo ok
    //         //mete a cena dos ships invisivel


    // }

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
                        
                        // TODO nao devia ser feito aqui
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






        // for (let game of this.playerStateGame) {
        //     if(game.idGame == idGame) {
        //
        //         //enivas as cenas para a bd
        //         this.gameService.putCurrentStateGames(game)
        //             .subscribe((response) => {
        //
        //                 // this.playerStateGame = response;
        //                 //
        //                 // console.log("esperaça!!!");
        //                 // console.log(this.playerStateGame);
        //                 // console.log("fim da esperaça!!!");
        //                 //
        //                 // console.dir(this.playerStateGame[0].boardDefense.navios);
        //
        //                 //this.playerStateGame[0].boardDefense.adicionaNavio(TipoNavio.PortaAvioes, Orientacao.Normal, 'A', 1);
        //
        //
        //         });
        //
        //         //break; //TODO avriguar a situation
        //     }
        // }



        //se tudo ok
            //mete a cena dos ships invisivel


    }

    shot(idGame : string, opponentUsername : string, line : string, column : number) : void{

        //DEGUB
        //alert("Game " + idGame + " Shot on : " + opponentUsername + " line: " + line + " column" + column);
        //alert("username: " + this.authenticationService.username)

        for(let game of this.playerStateGame) {

            if(game.idGame == idGame) {

                if (game.currentPlayer != this.authenticationService.username) {
                    alert("Its not your turn. Wait.")
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

                            // this.playerStateGame = response; //TODO ?

                            console.log(response)
                            game.nrShotsRemaining = response.nrShotsRemaining;
                            game.currentPlayer = response.currentPlayer;

                            for (let attackBoard of game.boardsAttack) {

                                if (attackBoard.getUsername() == opponentUsername) {

                                    // TODO não esta a fazer a atualização, ver depois a cena do moodle (restify), BUG a atribuição, se calhar não ira funcionar, porque o depois perde os seus metodos
                                    // attackBoard = response.boardAttack;
                                    attackBoard.setValue(line, column, (response.shot != '' ? 'X' : '0' ));

                                }
                            }

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
                                
                                // TODO? mandar dados por websocket para o jogador que perdeu? para fazer highlight? talvez sempre que é tiro? ship sank? all ship sank? animar com jquery??
                                // manda por websocket o status ENDED ao jogador que perdeu
                                let updateJson = {
                                    idGame: idGame,
                                    username: opponentUsername,
                                    status: PlayerStateGame.gameStatus_toString(GameStatus.ENDED)
                                }
                                this.websocketService.updateGameStatus(idGame, updateJson);

                                console.log(response.gameEnded)
                                if (response.gameEnded) {
                                    json.myMessage = 'Congratz!! You have won the game!';
                                    json.othersMessage = 'Player ' + this._username + ' has won the game.';
                                    this.websocketService.useNotifications(idGame + ' notifications', json);

                                    // nao deveria ser assim
                                    game.status = PlayerStateGame.gameStatus_toString(GameStatus.ENDED);
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


                //break??? TODO
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

    desenhaTabuleiro() : void {

      


      /*document.getElementById('msgerro').innerText='';
      try {
          document.getElementById('tabela').innerHTML = "";
          let plainHtml = "";
          Tabuleiro.todasLinhas().forEach(linha => {
              plainHtml += "<tr><td>" + linha + "</td>";
              Tabuleiro.todasColunas().forEach(coluna => {
                  if (this.tabuleiro.getCelula(linha, coluna).tipo == TipoCelula.Navio)
                      plainHtml += "<td>X</td>";
                  else    
                      if (Posicao.existe(new Posicao(linha, coluna), this.tabuleiro.posicoesOcupadas))
                          plainHtml += "<td>.</td>";
                      else    
                          plainHtml += "<td>&nbsp</td>";

              });
              plainHtml += "</tr>";
          });
          plainHtml += "<tr><td></td>";
          Tabuleiro.todasColunas().forEach(coluna => {
                  plainHtml += "<td>"+coluna+"</td>";
          });
          plainHtml += "</tr>";
          document.getElementById('tabela').innerHTML = plainHtml;


          plainHtml = "";
          document.getElementById('listanavios').innerHTML = "";
          this.tabuleiro.navios.forEach(navio => {
              plainHtml += "<li>"+navio.posicao.strValue()+" Tipo=" + navio.tipoNavio+ ", Orientação="+ navio.orientacao+"</li>";
          });
          document.getElementById('listanavios').innerHTML = plainHtml;
          
      } catch (e) {
          document.getElementById('msgerro').innerText=e;
      }*/

    }

  //#1 ir buscar todos os jogos que precisa


  //#2 Se existir jogos 'pedding' por cada jogo

    //#2.1 - preencher o tabuleiro do proprio jogo


    //#2.2 por cada jogo dos adversarios

      //#2.2.1 - prencher o tabuleiro do jogo do adversario X

    
  

 }