"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var game_service_1 = require('./../services/game.service');
var game_1 = require('./game');
var tabuleiro_1 = require("./tabuleiro");
var navio_1 = require("./navio");
var board_defense_1 = require("./models/board-defense");
var websocket_service_1 = require('../sockets/notifications/websocket.service');
var authentication_service_1 = require("../login-register/_services/authentication.service");
var GameComponent = (function () {
    //private celulas : number[][];
    function GameComponent(gameService, websocketService, authenticationService) {
        //document.getElementById('container').innerText='';
        var _this = this;
        this.gameService = gameService;
        this.websocketService = websocketService;
        this.authenticationService = authenticationService;
        this.COLUMNS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.LINES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        // this._username = 'Cao de Agua';// = JSON.parse(localStorage.getItem('currentUser')); //TODO passar para o login
        this._username = JSON.parse(localStorage.getItem('currentUser')).username;
        //DUVIDA(simão) => porquê?
        this.gameService.setUsername(this._username);
        this.playerStateGame = [];
        this.tabuleiro = new tabuleiro_1.Tabuleiro();
        //TODO so para testar
        var value = 12;
        // let username : string;
        // username = 'Cao de Agua';
        /*this.gameService.getCurrentGames(username)
                .subscribe((response) => this.games = response);*/
        this.gameService.getCurrentStateGames(this._username)
            .subscribe(function (response) {
            // console.log("------ No CLIENTE -------");
            // console.dir(response);
            // console.log("------ FIM No CLIENTE -------");
            _this.playerStateGame = response;
            // this.playerStateGame.forEach((game) => {
            // });
            //this.playerStateGame[0].boardDefense.adicionaNavio(TipoNavio.PortaAvioes, Orientacao.Normal, 'A', 1);
            // console.log("------ No CLIENTE -------");
            // console.dir(this.playerStateGame );
            // console.log("------ FIM No CLIENTE -------");
            // ----
            _this.playerStateGame.forEach(function (game) {
                _this.websocketService.joinGameRoom(game.idGame);
            });
            _this.websocketService.getGameState('change game state')
                .subscribe(function (json) {
                console.log("OBTEU JOGO POR SOCKET");
                // console.log("OBTEU JOGO POR SOCKET");
                json.forEach(function (jsonGame) {
                    _this.playerStateGame.forEach(function (myGame) {
                        if (myGame.idGame === jsonGame.idGame
                            && _this._username === jsonGame.username) {
                            // myGame = jsonGame;
                            myGame.status = jsonGame.status;
                        }
                    });
                });
                console.log("/OBTEU JOGO POR SOCKET");
                // console.log("/OBTEU JOGO POR SOCKET");
            });
            _this.websocketService.getCurrentPlayer('update current player')
                .subscribe(function (json) {
                console.log("OBTEU update current player POR SOCKET");
                _this.playerStateGame.forEach(function (myGame) {
                    if (myGame.idGame === json.idGame) {
                        myGame.currentPlayer = json.currentPlayer;
                        myGame.nrShotsRemaining = json.nrShotsRemaining;
                        console.log(myGame.currentPlayer + '|' + myGame.nrShotsRemaining);
                        console.log(json.currentPlayer + '|' + json.nrShotsRemaining);
                    }
                });
                console.log("/OBTEU update current player POR SOCKET");
            });
            _this.websocketService.getCurrentPlayer('update game status')
                .subscribe(function (json) {
                console.log("OBTEU update game status POR SOCKET");
                // console.log(json)
                // console.log(this._username)
                if (_this._username === json.username) {
                    // console.log('SOU EU')
                    _this.playerStateGame.forEach(function (myGame) {
                        if (myGame.idGame === json.idGame) {
                            // console.log('É O MEU JOGO')
                            myGame.status = json.status;
                        }
                    });
                }
                console.log("/OBTEU update game status POR SOCKET");
            });
        });
        //desenhaTabuleiro();
    }
    GameComponent.prototype.addNavioToBoardDefense = function (idGame) {
        document.getElementById('msgerro').innerText = '';
        try {
            var tipo = document.getElementById('tiponavio').value;
            var orient = document.getElementById('orientacao').value;
            var linha = document.getElementById('linha').value;
            if (['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].indexOf(linha) < 0) {
                throw Error("Linha Inválida");
            }
            var coluna = document.getElementById('coluna').value;
            var tipoNavio = navio_1.TipoNavio.PortaAvioes;
            switch (tipo) {
                case "1":
                    tipoNavio = navio_1.TipoNavio.Couracado;
                    break;
                case "2":
                    tipoNavio = navio_1.TipoNavio.Cruzador;
                    break;
                case "3":
                    tipoNavio = navio_1.TipoNavio.ContraTorpedeiro;
                    break;
                case "4":
                    tipoNavio = navio_1.TipoNavio.Submarino;
                    break;
            }
            var orientacao = navio_1.Orientacao.Normal;
            switch (orient) {
                case "1":
                    orientacao = navio_1.Orientacao.Roda90;
                    break;
                case "2":
                    orientacao = navio_1.Orientacao.Roda180;
                    break;
                case "3":
                    orientacao = navio_1.Orientacao.Roda270;
                    break;
            }
            // Força cast para numero
            var col = +coluna;
            //this.tabuleiro.adicionaNavio(tipoNavio, orientacao, linha, col);
            for (var _i = 0, _a = this.playerStateGame; _i < _a.length; _i++) {
                var game = _a[_i];
                if (game.idGame == idGame) {
                    game.boardDefense.adicionaNavio(tipoNavio, orientacao, linha, col);
                }
            }
        }
        catch (e) {
            document.getElementById('msgerro').innerText = e;
        }
    };
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
    GameComponent.prototype.ready = function (game) {
        var _this = this;
        if (game.boardDefense.isConfigDone() === false) {
            alert("Ainda não tem as peças todas");
        }
        else {
            // inicio websockets
            var json = {
                myMessage: 'I\'m ready.',
                othersMessage: 'Player ' + JSON.parse(localStorage.getItem("currentUser")).username + ' is ready.'
            };
            this.websocketService.useNotifications(game.idGame + ' notifications', json);
            // fim websockets
            this.gameService.putReadyOnGame(game)
                .subscribe(function (games) {
                if (game.boardsAttack.length + 1 === games.length) {
                    var json_1 = {
                        myMessage: 'Everyone is ready',
                        othersMessage: 'Everyone is ready.'
                    };
                    _this.websocketService.useNotifications(game.idGame + ' notifications', json_1);
                    // TODO nao devia ser feito aqui
                    games.forEach(function (g) {
                        if (g.username === _this._username) {
                            // altero o status do meu jogo
                            game.status = g.status;
                        }
                    });
                    // game.status = PlayerStateGame.gameStatus_toString(GameStatus.INPROGRESS);
                    _this.websocketService.alterGameState(game.idGame, games);
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
    };
    GameComponent.prototype.shot = function (idGame, opponentUsername, line, column) {
        //DEGUB
        //alert("Game " + idGame + " Shot on : " + opponentUsername + " line: " + line + " column" + column);
        //alert("username: " + this.authenticationService.username)
        var _this = this;
        var _loop_1 = function(game) {
            if (game.idGame == idGame) {
                if (game.currentPlayer != this_1.authenticationService.username) {
                    alert("Its not your turn. Wait.");
                }
                else {
                    //ver se foi tiro ?
                    var resp = void 0;
                    this_1.gameService.putHasShotCurrentStateGamePerUsernameByPosition(idGame, opponentUsername, line, column, this_1._username)
                        .subscribe(function (response) {
                        //DEBUG
                        // console.log("=======> TIRO ");
                        // console.dir(response);
                        // alert("TIRO: "+ response);
                        // alert("TIRO: "+ response.shot);
                        // resp = response;
                        // this.playerStateGame = response; //TODO ?
                        console.log(response);
                        game.nrShotsRemaining = response.nrShotsRemaining;
                        game.currentPlayer = response.currentPlayer;
                        for (var _i = 0, _a = game.boardsAttack; _i < _a.length; _i++) {
                            var attackBoard = _a[_i];
                            if (attackBoard.getUsername() == opponentUsername) {
                                // TODO não esta a fazer a atualização, ver depois a cena do moodle (restify), BUG a atribuição, se calhar não ira funcionar, porque o depois perde os seus metodos
                                // attackBoard = response.boardAttack;
                                attackBoard.setValue(line, column, (response.shot != '' ? 'X' : '0'));
                            }
                        }
                        //inicio websockets
                        var json = {
                            myMessage: 'You shot ' + response.defendingPlayer + '(' + line + ', ' + column + ') and ',
                            // othersMessage: 'Player ' + JSON.parse(localStorage.getItem("currentUser")).username + ' shot '+ response.defendingPlayer + '(' + line + ', ' + column + ') and '
                            othersMessage: 'Player ' + _this._username + ' shot ' + response.defendingPlayer + '(' + line + ', ' + column + ') and '
                        };
                        if (response.shot != '') {
                            json.myMessage += 'hit ' + response.shipType + '.';
                            json.othersMessage += 'hit ' + response.shipType + '.';
                        }
                        else {
                            json.myMessage += 'missed.';
                            json.othersMessage += 'missed.';
                        }
                        _this.websocketService.useNotifications(idGame + ' notifications', json);
                        if (response.sank) {
                            json.myMessage = 'Congratulations! You have sank ' + response.defendingPlayer + ' ' + response.shipType + '.';
                            // json.othersMessage = 'Player ' + JSON.parse(localStorage.getItem("currentUser")).username + ' has sank ' + response.defendingPlayer + ' ' + response.shipType + '.';
                            json.othersMessage = 'Player ' + _this._username + ' has sank ' + response.defendingPlayer + ' ' + response.shipType + '.';
                            _this.websocketService.useNotifications(idGame + ' notifications', json);
                        }
                        if (response.allShipsSanked) {
                            json.myMessage = 'You have sank all ' + response.defendingPlayer + ' ships.';
                            // json.othersMessage = 'Player ' + JSON.parse(localStorage.getItem("currentUser")).username + ' has sank all ' + response.defendingPlayer + ' ships.';
                            json.othersMessage = 'Player ' + _this._username + ' has sank all ' + response.defendingPlayer + ' ships.';
                            _this.websocketService.useNotifications(idGame + ' notifications', json);
                            // TODO? mandar dados por websocket para o jogador que perdeu? para fazer highlight? talvez sempre que é tiro? ship sank? all ship sank? animar com jquery??
                            // manda por websocket o status ENDED ao jogador que perdeu
                            var updateJson_1 = {
                                idGame: idGame,
                                username: opponentUsername,
                                status: game_1.PlayerStateGame.gameStatus_toString(game_1.GameStatus.ENDED)
                            };
                            _this.websocketService.updateGameStatus(idGame, updateJson_1);
                            console.log(response.gameEnded);
                            if (response.gameEnded) {
                                // nao deveria ser assim
                                game.status = game_1.PlayerStateGame.gameStatus_toString(game_1.GameStatus.ENDED);
                                game.won = true;
                                json.myMessage = 'Congratz!! You have won the game!';
                                json.othersMessage = 'Player ' + _this._username + ' has won the game.';
                                _this.websocketService.useNotifications(idGame + ' notifications', json);
                            }
                        }
                        var updateJson = {
                            idGame: idGame,
                            nrShotsRemaining: response.nrShotsRemaining,
                            currentPlayer: response.currentPlayer
                        };
                        _this.websocketService.updateCurrentPlayer(idGame, updateJson);
                        // fim sockets
                    });
                }
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = this.playerStateGame; _i < _a.length; _i++) {
            var game = _a[_i];
            _loop_1(game);
        }
    };
    GameComponent.prototype.limparTabuleiro = function (idGame) {
        document.getElementById('msgerro').innerText = '';
        for (var _i = 0, _a = this.playerStateGame; _i < _a.length; _i++) {
            var game = _a[_i];
            if (game.idGame == idGame) {
                game.boardDefense = null;
                game.boardDefense = new board_defense_1.BoardDefense();
            }
        }
    };
    GameComponent.prototype.desenhaTabuleiro = function () {
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
    };
    GameComponent.prototype.closeGame = function (idGame) {
        var _this = this;
        this.gameService.closeGame(idGame)
            .subscribe(function (response) {
            console.log('INI - RESPOSTA DO CLOSEGAME');
            console.log(response);
            console.log('FIM - RESPOSTA DO CLOSEGAME');
            _this.playerStateGame.forEach(function (stateGame) {
                if (stateGame.idGame == response.idGame) {
                    stateGame.isPlaying = response.isPlaying;
                }
            });
        });
    };
    GameComponent = __decorate([
        core_1.Component({
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
        }), 
        __metadata('design:paramtypes', [game_service_1.GameService, websocket_service_1.WebSocketService, authentication_service_1.AuthenticationService])
    ], GameComponent);
    return GameComponent;
}());
exports.GameComponent = GameComponent;
//# sourceMappingURL=game.component.js.map