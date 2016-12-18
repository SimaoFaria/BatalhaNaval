import { Component, OnInit } from '@angular/core';

import { GameService } from './../services/game.service';

import {Game, PlayerStateGame, GameStatus, CellAttack} from './game';

import {Tabuleiro} from "./tabuleiro";
import {TipoNavio, Orientacao, Navio} from "./navio";
import {TipoCelula} from "./celula";
import {Posicao} from "./posicao";
import {BoardDefense} from "./models/board-defense";


import {WebSocketService } from '../sockets/notifications/websocket.service';

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

    constructor(private gameService: GameService, private websocketService: WebSocketService ) {

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
                
                this.websocketService.getGameMessages('change game state')
                .subscribe( (json: PlayerStateGame[]) => {
                    
                    console.log("OBTEU JOGO POR SOCKET");
                    // console.log("OBTEU JOGO POR SOCKET");
                    
                    json.forEach((jsonGame) => {
                        this.playerStateGame.forEach((myGame) => {

                            // console.log('--------------')
                            // console.log(myGame.idGame)
                            // console.log(jsonGame.idGame)
                            // console.log(jsonGame.username)
                            // console.log(this._username)
                            // console.log('--------------')

                            if (myGame.idGame === jsonGame.idGame
                                && this._username === jsonGame.username) {
                                
                                // console.log('ENTROU =(')
                                // console.log(myGame.status)
                                // console.log(jsonGame.status)

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
                } );

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

            
            // this.websocketService.getGameMessages('change game state')
            //     .subscribe( (json: PlayerStateGame[]) => {
                    
            //         console.log("OBTEU JOGO POR SOCKET");
                    
            //         json.forEach((jsonGame) => {

            //                 // console.log('--------------')
            //                 // console.log(game.idGame)
            //                 // console.log(jsonGame.idGame)
            //                 // console.log(jsonGame.username)
            //                 // console.log(this._username)
            //                 // console.log('--------------')

            //                 if (game.idGame === jsonGame.idGame
            //                     && this._username === jsonGame.username) {
                                
            //                     console.log('ENTROU =(')
            //                     console.log(game.status)
            //                     console.log(jsonGame.status)
            //                     game = null;
            //                     game = jsonGame;
            //                     game.status = jsonGame.status;
                                
            //                     console.log(game.status)
            //                     console.log(jsonGame.status)

            //                 }
            //         });
            //         console.log("/OBTEU JOGO POR SOCKET");
            //     } );

            // alert("Começar jogo");

            //console.log(game);

            //TODO SIMAO estou a usar o websocket aqui uma vez que não dá para trabalhar o response(o gameService devolve o response como undefined)
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
                                game.status = g.status;
                                console.log(game.status)
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

        //alert("Game " + idGame + " Shot on : " + opponentUsername + " line: " + line + " column" + column);

        for(let game of this.playerStateGame) {

            if(game.idGame == idGame) {

                //ver se foi tiro ?
                let resp : string;
                this.gameService.putHasShotCurrentStateGamePerUsernameByPosition(idGame, opponentUsername, line, column)
                    .subscribe((response: any) => {

                        // console.log("=======> TIRO ");
                        // console.dir(response);
                        // alert("TIRO: "+ response);
                        // alert("TIRO: "+ response.shot);
                        // resp = response;

                        // this.playerStateGame = response; //TODO ?

                        for (let attackBoard of game.boardsAttack) {

                            if(attackBoard.getUsername() == opponentUsername) {

                                // attackBoard.setValue(line, column, (resp != '' ? 'X' : '0' ));
                                attackBoard.setValue(line, column, (response.shot != '' ? 'X' : '0' ));

                                //inicio websockets
                                let json = {
                                    myMessage: 'You shot (' + line + ', ' + column + ') and ',
                                    othersMessage: 'Player ' + JSON.parse(localStorage.getItem("currentUser")).username + ' shot (' + line + ', ' + column + ') and '
                                }

                                //TODO SIMAO por agora recebo a string do response, mas se a response devolvesse um object seria mais facil
                                if(response.shot != '') {
                                    json.myMessage += 'hit ' + response.shipType + '.';
                                    json.othersMessage += 'hit ' + response.shipType + '.';
                                } else {
                                    json.myMessage += 'missed.';
                                    json.othersMessage += 'missed.';
                                }
                                this.websocketService.useNotifications(idGame + ' notifications', json);
                                if (response.sank) {
                                    json.myMessage = 'Congratulations! You have sank ' + response.shipType + '.';
                                    json.othersMessage = 'Player ' + JSON.parse(localStorage.getItem("currentUser")).username + ' has sank ' + response.shipType + '.';  
                                    this.websocketService.useNotifications(idGame + ' notifications', json);
                                }
                                // TODO ainda falta tratar da situação de o jogador ter ficado sem navios
                                if (response.allShipsSanked) {
                                    json.myMessage = 'Player TODO has all ship sank.';
                                    json.othersMessage = 'Player TODO has all ship sank.';  
                                    this.websocketService.useNotifications(idGame + ' notifications', json);
                                }
                                
                                // TODO ainda falta tratar da situação do jogo terminar
                                //fim websockets

                                //TODO fazer post para a bd
                                this.gameService.putCurrentStateGames(game, false)
                                    .subscribe((response: any) => {

                                        // this.playerStateGame = response; //TODO

                                    });
                            }
                        }
                });

                    //receber mensagem se foi tiro

                    //desbloqear a celula para edicao se o utilizador quiser pode marcar como tiro ou agua A ou T

                    // this.gameService.putCurrentStateGames(game, true)
                    //     .subscribe((response) => {
                    //
                    //         // this.playerStateGame = response; //TODO ?
                    //
                    // });

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